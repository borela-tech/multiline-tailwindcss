import {invalidateCss} from './invalidateCss'
import {transformTaggedStrings} from '@borela-tech/multiline-tailwindcss'
import type {Plugin} from 'vite'
import type {SharedState} from './SharedState'

export function transformTaggedStringsPlugin(state: SharedState) {
  return {
    enforce: 'pre',
    name: '@borela-tech/vite-plugin-multiline-tailwindcss:transform-tagged-strings',
    transform(code, id) {
      if (!/\.[jt]sx?$/.test(id))
        return code

      const {
        candidatesFromTransforms: {
          tagged: candidatesPerId,
        },
      } = state

      const {
        candidatesFound,
        transformedCode: {
          code: transformedCode,
          map: transformedCodeMap,
        },
      } = transformTaggedStrings(code, id)

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
