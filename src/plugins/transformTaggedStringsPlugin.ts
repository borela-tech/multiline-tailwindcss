import {Plugin} from 'vite'
import {SharedState} from './SharedState'
import {transformTaggedStrings} from '../lib/transformTaggedStrings'
import {updateModule} from '../lib/updateModule'

export function transformTaggedStringsPlugin(state: SharedState): Plugin {
  return {
    name: '@borela-tech/vite-plugin-multiline-tailwind:transform-tagged-strings',
    transform(code, id) {
      if (!/\.[jt]sx?$/.test(id))
        return code

      const {
        candidatesPerId,
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
