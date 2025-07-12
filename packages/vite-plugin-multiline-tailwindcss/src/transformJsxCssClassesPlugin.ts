import {Plugin} from 'vite'
import {SharedState} from './SharedState'
import {transformJsxCssClasses} from '@/lib/transformJsxCssClasses'
import {updateModule} from './updateModule'

export function transformJsxCssClassesPlugin(state: SharedState) {
  return {
    name: '@borela-tech/vite-plugin-multiline-tailwindcss:transform-jsx-css-classes',
    enforce: 'pre',
    transform(code, id) {
      if (!/\.[jt]sx$/.test(id))
        return code

      const {
        candidatesFromTransforms: {
          className: candidatesPerId,
        },
        devServer,
        rootCssPath,
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
          updateModule(devServer, rootCssPath!)
      }

      return {
        code: transformedCode,
        map: transformedCodeMap,
      }
    },
  } satisfies Plugin
}
