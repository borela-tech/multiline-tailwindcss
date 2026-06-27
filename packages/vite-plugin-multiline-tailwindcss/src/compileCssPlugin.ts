import {collectCandidates} from './collectCandidates'
import {compile} from '@tailwindcss/node'
import {debounce} from '@borela-tech/ts-toolbox'
import {invalidateCss} from './invalidateCss'
import {Scanner} from '@tailwindcss/oxide'
import {setupFileWatcher} from './setupFileWatcher'
import {toSourceMap} from '@tailwindcss/node'
import {writeCandidatesFile} from '@borela-tech/multiline-tailwindcss'
import type {Plugin} from 'vite'
import type {SharedState} from './SharedState'

const RETRY_DELAY = 100
const retryCompilation = debounce(
  (state: SharedState) => invalidateCss(state),
)

export function compileCssPlugin(state: SharedState) {
  return {
    configResolved(config) {
      state.outDir = config.build.outDir
    },
    configureServer(server) {
      setupFileWatcher(server, state)
    },
    enforce: 'pre',
    name: '@borela-tech/vite-plugin-multiline-tailwindcss:compile-css',
    async transform(code, id) {
      const {
        candidatesFromTransforms: {
          className: classNameCandidatesPerId,
          tagged: taggedCandidatesPerId,
        },
        rootCssDirPath,
        rootCssPath,
      } = state

      if (id !== rootCssPath)
        return code

      let compiler
      const cssDependencies = new Set<string>()

      try {
        compiler = await compile(code, {
          base: rootCssDirPath!,
          from: id,
          onDependency: (dependencyPath: string) => {
            this.addWatchFile(dependencyPath)
            cssDependencies.add(dependencyPath)
          },
          shouldRewriteUrls: true,
        })
      } catch (error) {
        const {
          compilationResult: previousCompilationResult,
          devServer,
        } = state

        if (devServer) {
          void retryCompilation(RETRY_DELAY, state)
          return previousCompilationResult
        }

        throw error
      }

      const scanner = new Scanner({
        sources: [{
          base: rootCssDirPath!,
          negated: false,
          pattern: '**/*',
        }, ...compiler.sources],
      })

      for (const filePath of scanner.files) {
        if (!cssDependencies.has(filePath))
          this.addWatchFile(filePath)
        cssDependencies.add(filePath)
      }

      state.cssDependencies = cssDependencies

      const ALL_CANDIDATES = collectCandidates(
        scanner,
        classNameCandidatesPerId,
        taggedCandidatesPerId,
      )

      const MAP = compiler.buildSourceMap()
      const GENERATED_CODE = compiler.build(ALL_CANDIDATES)
      const GENERATED_MAP = toSourceMap(MAP).raw

      return state.compilationResult = {
        code: GENERATED_CODE,
        map: GENERATED_MAP,
      }
    },
    writeBundle() {
      if (!state.outDir)
        return

      const allCandidates: string[] = []

      for (const [, candidates] of state.candidatesFromTransforms.className)
        allCandidates.push(...candidates)

      for (const [, candidates] of state.candidatesFromTransforms.tagged)
        allCandidates.push(...candidates)

      if (allCandidates.length === 0)
        return

      writeCandidatesFile(state.outDir, allCandidates)
    },
  } satisfies Plugin
}
