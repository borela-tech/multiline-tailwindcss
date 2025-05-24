import {Plugin} from 'vite'
import {SharedState} from './SharedState'

export function getConfigOptionsPlugin(state: SharedState): Plugin {
  return {
    name: '@borela-tech/vite-plugin-multiline-tailwind:get-config=options',
    enforce: 'pre',
    configResolved(config) {
      state.projectRoot = config.root
    },
  }
}
