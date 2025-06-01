import {defineConfig} from 'tsup'

export default defineConfig(options => {
  return {
    ...options,
    clean: true,
    dts: true,
    entry: {
      index: 'src/index.ts',
    },
    format: ['esm'],
    splitting: false,
    sourcemap: true,
  }
})
