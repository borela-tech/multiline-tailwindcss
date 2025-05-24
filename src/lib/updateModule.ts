import {ViteDevServer} from 'vite'

export function updateModule(
  devServer: ViteDevServer,
  id: string,
) {
  const module = devServer.moduleGraph.getModuleById(id)
  if (!module)
    return

  devServer.moduleGraph.invalidateModule(module)
  devServer.reloadModule(module)
}
