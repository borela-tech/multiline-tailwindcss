import {join} from 'node:path'
import {Plugin} from 'vite'
import {SharedState} from './SharedState'

export function initialize(state: SharedState): Plugin {
  return {
    name: '@borela-tech/vite-plugin-multiline-tailwindcss:initialize',
    enforce: 'pre',
    configResolved(config) {
      if (!config.root)
        throw new Error('root is not defined')

      state.rootCssPath = join(config.root, 'src', 'index.css')
      state.projectRootPath = config.root
      state.srcDirPath = join(config.root, 'src')
    },
    configureServer(server) {
      state.devServer = server
    },
  } satisfies Plugin
}
