import {isExternalPath} from './isExternalPath'
import type {ViteDevServer} from 'vite'

export function ensureExternalPathIsWatched(
  path: string,
  devServer: undefined | ViteDevServer,
) {
  if (!devServer)
    return

  const {
    config: {
      root,
    },
    watcher,
  } = devServer

  if (!isExternalPath(path, root))
    return

  watcher.add(path)
}
