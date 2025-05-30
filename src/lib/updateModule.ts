import {ViteDevServer} from 'vite'

const intervals = new Map<string, NodeJS.Timeout>()

export function updateModule(
  devServer: ViteDevServer,
  id: string,
) {
  const module = devServer.moduleGraph.getModuleById(id)
  if (!module)
    return

  let interval = intervals.get(id)
  if (interval)
    clearInterval(interval)

  devServer.moduleGraph.invalidateModule(module)

  interval = setInterval(() => {
    if (module.invalidationState != 'HARD_INVALIDATED') {
      clearInterval(interval)
      intervals.delete(id)
      return
    }

    devServer.moduleGraph.invalidateModule(module)
    void devServer.reloadModule(module)
  }, 10)

  intervals.set(id, interval)
}
