import {Plugin} from 'vite'
import {Scanner} from '@tailwindcss/oxide'
import {SharedState} from './SharedState'

import {
  compile,
  toSourceMap,
} from '@tailwindcss/node'

export function compileCssPlugin(state: SharedState) {
  return {
    name: '@borela-tech/vite-plugin-multiline-tailwind:compile-css',
    enforce: 'pre',
    async transform(code, id) {
      const {
        candidatesFromTransforms: {
          className: classNameCandidatesPerId,
          tagged: taggedCandidatesPerId,
        },
        projectRootPath,
        resolveCss,
        resolveJs,
        rootCssPath,
        srcDirPath,
      } = state

      if (id !== rootCssPath)
        return code


      const compiler = await compile(code, {
        base: srcDirPath!,
        customCssResolver: resolveCss!,
        customJsResolver: resolveJs!,
        from: id,
        onDependency: (path: string) => {
          this.addWatchFile(path)
        },
        shouldRewriteUrls: true,
      })

      const scanner = new Scanner({
        sources: [
          {
            base: projectRootPath!,
            pattern: '**/*',
            negated: false,
          },
          ...compiler.sources,
        ],
      })

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
  } satisfies Plugin
}
