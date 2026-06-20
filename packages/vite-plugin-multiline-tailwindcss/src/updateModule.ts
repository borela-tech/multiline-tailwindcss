import type {SharedState} from './SharedState'

export function updateModule(state: SharedState, id: string) {
  const {devServer} = state
  if (!devServer)
    return

  const module = devServer.moduleGraph.getModuleById(id)
  if (!module)
    return

  devServer.moduleGraph.invalidateModule(module)
  devServer.hot.send('vite:invalidate', {
    firstInvalidatedBy: '@borela-tech/vite-plugin-multiline-tailwindcss',
    message: 'New Tailwind candidates found.',
    path: module.url,
  })
}
