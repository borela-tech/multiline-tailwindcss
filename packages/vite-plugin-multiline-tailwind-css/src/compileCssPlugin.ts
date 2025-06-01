import {Plugin} from 'vite'
import {SharedState} from './SharedState'

import {
  compile,
  toSourceMap,
} from '@tailwindcss/node'

export function compileCssPlugin(state: SharedState) {
  return {
    name: '@borela-tech/vite-plugin-multiline-tailwind:compile-css',
    async transform(code, id) {
      const {
        candidates: {
          className: classNameCandidatesPerId,
          tagged: taggedCandidatesPerId,
        },
        projectRoot,
        virtualTailwindModule: {
          resolvedId: virtualTailwindModuleResolvedId,
        },
      } = state

      if (!projectRoot)
        throw new Error('Project root is not defined')

      if (id !== virtualTailwindModuleResolvedId)
        return code

      const compiler = await compile(code, {
        base: projectRoot,
        onDependency: (path: string) => {
          this.addWatchFile(path)
        },
      })

      const ALL_CANDIDATES: string[] = []

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
  } satisfies Plugin
}
