import {invalidateCss} from './invalidateCss'
import {transformJsxCssClasses} from '@borela-tech/multiline-tailwindcss'
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
        invalidateCss(state)

      return {
        code: transformedCode,
        map: transformedCodeMap,
      }
    },
  } satisfies Plugin
}
