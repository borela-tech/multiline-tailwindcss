import path from 'path'
import {defineConfig} from 'vite'

const viteConfig = defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      fileName(format) {
        return `index.${format === 'es' ? 'mjs' : 'cjs'}`
      },
      formats: ['es', 'cjs'],
    },
    minify: false,
    rollupOptions: {
      external: [
        /^@?babel\//,
        /^node:/,
        'esbuild',
        'fs',
        'path',
        'tailwindcss',
      ],
    },
    sourcemap: true,
    target: 'node25',
  },
})

export {viteConfig as default}
