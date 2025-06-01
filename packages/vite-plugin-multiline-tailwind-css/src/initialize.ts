import {Plugin} from 'vite'
import {SharedState} from './SharedState'

export function initialize(state: SharedState): Plugin {
  return {
    name: '@borela-tech/vite-plugin-multiline-tailwind:initialize',
    enforce: 'pre',
    configResolved(config) {
      state.projectRoot = config.root
    },
    configureServer(server) {
      state.devServer = server
    },
  } satisfies Plugin
}
