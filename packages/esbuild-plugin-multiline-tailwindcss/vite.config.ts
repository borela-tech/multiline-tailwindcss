import path from 'path'
import {defineConfig} from 'vite'

export default defineConfig({
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
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../..'),
    },
  },
})
