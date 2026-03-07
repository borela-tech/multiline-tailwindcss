import {defineConfig} from 'tsdown'

export default defineConfig(options => {
  return {
    ...options,
    clean: true,
    dts: true,
    entry: {
      index: 'src/index.ts',
    },
    deps: {
      skipNodeModulesBundle: true,
    },
    format: ['esm'],
    splitting: false,
    sourcemap: true,
  }
})
