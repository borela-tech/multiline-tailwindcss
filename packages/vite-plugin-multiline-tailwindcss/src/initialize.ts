import {dirname} from 'node:path'
import {join} from 'node:path'
import {resolve} from 'node:path'
import type {Plugin} from 'vite'
import type {SharedState} from './SharedState'

export function initialize(state: SharedState): Plugin {
  return {
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
    enforce: 'pre',
    name: '@borela-tech/vite-plugin-multiline-tailwindcss:initialize',
  } satisfies Plugin
}
