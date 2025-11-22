import {
  dirname,
  isAbsolute,
  join,
} from 'node:path'
import {Plugin} from 'vite'
import {SharedState} from './SharedState'

export function initialize(state: SharedState): Plugin {
  return {
    name: '@borela-tech/vite-plugin-multiline-tailwindcss:initialize',
    enforce: 'pre',
    configResolved(config) {
      if (!config.root)
        throw new Error('root is not defined')

      state.rootCssPath ||= 'src/index.css'

      if (!isAbsolute(state.rootCssPath))
        state.rootCssPath = join(config.root, state.rootCssPath)

      state.rootCssDirPath = dirname(state.rootCssPath)
    },
    configureServer(server) {
      state.devServer = server
    },
  } satisfies Plugin
}
