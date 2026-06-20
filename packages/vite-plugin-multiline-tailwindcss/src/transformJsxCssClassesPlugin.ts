import {transformJsxCssClasses} from '@borela-tech/multiline-tailwindcss'
import {updateModule} from './updateModule'
import type {Plugin} from 'vite'
import type {SharedState} from './SharedState'

export function transformJsxCssClassesPlugin(state: SharedState) {
  return {
    enforce: 'pre',
    name: '@borela-tech/vite-plugin-multiline-tailwindcss:transform-jsx-css-classes',
    transform(code, id) {
      if (!/\.[jt]sx$/.test(id))
        return code

      const {
        candidatesFromTransforms: {
          className: candidatesPerId,
        },
        rootCssPath,
      } = state

      const {
        candidatesFound,
        transformedCode: {
          code: transformedCode,
          map: transformedCodeMap,
        },
      } = transformJsxCssClasses(code, id)

      candidatesPerId.set(id, candidatesFound)

      if (candidatesFound.length > 0)
        updateModule(state, rootCssPath!)

      return {
        code: transformedCode,
        map: transformedCodeMap,
      }
    },
  } satisfies Plugin
}
