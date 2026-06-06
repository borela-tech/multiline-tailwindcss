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
        'fs',
        'path',
        /^@?babel\//,
        /^node:/,
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
