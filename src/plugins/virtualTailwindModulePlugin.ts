import {Plugin} from 'vite'
import {SharedState} from './SharedState'

export function virtualTailwindModulePlugin(state: SharedState): Plugin {
  return {
    name: '@borela-tech/vite-plugin-multiline-tailwind:virtual-tailwind-module',
    resolveId(id) {
      const {
        virtualTailwindModule: {
          id: virtualModuleId,
          resolvedId: resolvedModuleId,
        },
      } = state

      if (id === virtualModuleId)
        return resolvedModuleId
    },
    load(id) {
      const {
        virtualTailwindModule: {
          resolvedId: resolvedModuleId,
        },
      } = state

      if (id !== resolvedModuleId)
        return
      return '@import "tailwindcss";'
    },
  }
}
