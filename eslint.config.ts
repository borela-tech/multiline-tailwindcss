import {config} from '@borela-tech/eslint-config'

config.push({
  ignores: [
    '**/__fixtures__/**',
    '**/dist/**',
  ],
})

export default config
