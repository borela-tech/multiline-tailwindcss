import type {ViteDevServer} from 'vite'

export function updateModule(devServer: ViteDevServer, id: string) {
  devServer.hot.send('vite:invalidate', {
    firstInvalidatedBy: '@borela-tech/vite-plugin-multiline-tailwindcss',
    message: 'New Tailwind candidates found.',
    path: id,
  })
}
