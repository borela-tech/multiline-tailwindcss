import {compile} from '@tailwindcss/node'
import {Scanner} from '@tailwindcss/oxide'
import {toSourceMap} from '@tailwindcss/node'
import {writeCandidatesFile} from '@lib/writeCandidatesFile'
import type {Plugin} from 'vite'
import type {SharedState} from './SharedState'

export function compileCssPlugin(state: SharedState) {
  return {
    configResolved(config) {
      state.outDir = config.build.outDir
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

      const compiler = await compile(code, {
        base: rootCssDirPath!,
        from: id,
        onDependency: (path: string) => {
          this.addWatchFile(path)
        },
        shouldRewriteUrls: true,
      })

      const scanner = new Scanner({
        sources: [{
          base: rootCssDirPath!,
          negated: false,
          pattern: '**/*',
        }, ...compiler.sources],
      })

      for (const path of scanner.files)
        this.addWatchFile(path)

      const ALL_CANDIDATES: string[] = scanner.scan()

      for (const [, candidates] of classNameCandidatesPerId)
        ALL_CANDIDATES.push(...candidates)

      for (const [, candidates] of taggedCandidatesPerId)
        ALL_CANDIDATES.push(...candidates)

      const MAP = compiler.buildSourceMap()
      const GENERATED_CODE = compiler.build(ALL_CANDIDATES)
      const GENERATED_MAP = toSourceMap(MAP).raw

      return {
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
