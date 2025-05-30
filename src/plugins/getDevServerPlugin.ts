import {Plugin} from 'vite'
import {SharedState} from './SharedState'

export function getDevServerPlugin(state: SharedState): Plugin {
  return {
    name: '@borela-tech/vite-plugin-multiline-tailwind:get-dev-server',
    enforce: 'pre',
    configureServer(server) {
      state.devServer = server
    },
  }
}
