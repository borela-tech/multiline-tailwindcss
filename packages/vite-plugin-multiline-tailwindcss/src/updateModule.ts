import type {ViteDevServer} from 'vite'

export function updateModule(devServer: ViteDevServer, id: string) {
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
