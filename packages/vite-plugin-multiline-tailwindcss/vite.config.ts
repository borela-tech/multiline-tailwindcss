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
        /^@tailwindcss\//,
        'fs',
        'path',
        'tailwindcss',
        'vite',
      ],
    },
    sourcemap: true,
    target: 'node25',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../..'),
    },
  },
})

export {viteConfig as default}
