import {Plugin} from 'vite'
import {SharedState} from './SharedState'
import {transformJsxCssClasses} from '@/lib/transformJsxCssClasses'
import {updateModule} from './updateModule'

export function transformJsxCssClassesPlugin(state: SharedState): Plugin {
  return {
    name: '@borela-tech/vite-plugin-multiline-tailwind:transform-jsx-css-classes',
    enforce: 'pre',
    transform(code, id) {
      if (!/\.[jt]sx$/.test(id))
        return code

      const {
        candidates: {
          className: candidatesPerId,
        },
        devServer,
        virtualTailwindModule: {
          resolvedId: virtualTailwindModuleResolvedId,
        },
      } = state

      const {
        candidatesFound,
        transformedCode: {
          code: transformedCode,
          map: transformedCodeMap,
        },
      } = transformJsxCssClasses(code)

      candidatesPerId.set(id, candidatesFound)

      if (candidatesFound.length > 0) {
        if (devServer)
          updateModule(devServer, virtualTailwindModuleResolvedId)
      }

      return {
        code: transformedCode,
        map: transformedCodeMap,
      }
    },
  }
}
