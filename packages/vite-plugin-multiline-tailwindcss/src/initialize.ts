import {Plugin} from 'vite'
import {SharedState} from './SharedState'
import {
  dirname,
  join,
  resolve,
} from 'node:path'

export function initialize(state: SharedState): Plugin {
  return {
    name: '@borela-tech/vite-plugin-multiline-tailwindcss:initialize',
    enforce: 'pre',
    configResolved(config) {
      if (!config.root)
        throw new Error('root is not defined')

      state.rootCssPath ||= join('src', 'index.css')
      state.rootCssPath = resolve(
        config.root,
        state.rootCssPath,
      )

      state.rootCssDirPath = dirname(state.rootCssPath)
    },
    configureServer(server) {
      state.devServer = server
    },
  } satisfies Plugin
}
