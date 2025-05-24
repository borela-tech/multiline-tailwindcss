import {ViteDevServer} from 'vite'

const timeouts = new Map<string, NodeJS.Timeout>()

export function updateModule(
  devServer: ViteDevServer,
  id: string,
) {
  const module = devServer.moduleGraph.getModuleById(id)
  if (!module)
    return

  let timeoutId = timeouts.get(id)
  if (timeoutId)
    clearTimeout(timeoutId)

  timeoutId = setTimeout(async () => {
    devServer.moduleGraph.invalidateModule(module)
    await devServer.reloadModule(module)
  }, 10)

  timeouts.set(id, timeoutId)
}
