import {invalidateCss} from './invalidateCss'
import type {SharedState} from './SharedState'
import type {ViteDevServer} from 'vite'

export function setupFileWatcher(server: ViteDevServer, state: SharedState) {
  server.watcher.on('change', filePath => {
    if (state.cssDependencies?.has(filePath))
      invalidateCss(state)
  })

  server.watcher.on('add', filePath => {
    if (state.cssDependencies?.has(filePath))
      invalidateCss(state)
  })
}
