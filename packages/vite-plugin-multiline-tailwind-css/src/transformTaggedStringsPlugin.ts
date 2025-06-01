import {Plugin} from 'vite'
import {SharedState} from './SharedState'
import {transformTaggedStrings} from '@/lib/transformTaggedStrings'
import {updateModule} from './updateModule'

export function transformTaggedStringsPlugin(state: SharedState): Plugin {
  return {
    name: '@borela-tech/vite-plugin-multiline-tailwind:transform-tagged-strings',
    enforce: 'pre',
    transform(code, id) {
      if (!/\.[jt]sx?$/.test(id))
        return code

      const {
        candidates: {
          tagged: candidatesPerId,
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
      } = transformTaggedStrings(code)

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
