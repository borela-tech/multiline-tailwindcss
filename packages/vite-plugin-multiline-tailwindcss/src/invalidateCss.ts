import type {SharedState} from './SharedState'
import type {ViteDevServer} from 'vite'

export function invalidateCss(server: ViteDevServer, state: SharedState) {
  const module = server.moduleGraph.getModuleById(state.rootCssPath!)
  if (module)
    server.moduleGraph.invalidateModule(module)
}
