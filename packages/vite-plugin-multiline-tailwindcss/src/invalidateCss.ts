import type {SharedState} from './SharedState'

export function invalidateCss(state: SharedState) {
  const {
    devServer,
    rootCssPath,
  } = state

  if (!devServer)
    return

  const module = devServer.moduleGraph.getModuleById(rootCssPath!)
  if (module)
    devServer.moduleGraph.invalidateModule(module)
}
