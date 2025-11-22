import {ViteDevServer} from 'vite'

export function updateModule(
  devServer: ViteDevServer,
  id: string,
) {
  devServer.hot.send('vite:invalidate', {
    path: id,
    message: 'New Tailwind candidates found.',
    firstInvalidatedBy: '@borela-tech/vite-plugin-multiline-tailwindcss',
  })
}
