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
        '@borela-tech/multiline-tailwindcss',
        'fs',
        'path',
        'tailwindcss',
        'vite',
        /^@?babel\//,
        /^@tailwindcss\//,
        /^node:/,
      ],
    },
    sourcemap: true,
    target: 'node25',
  },
})

export {viteConfig as default}
