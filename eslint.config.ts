import {CONFIG} from '@borela-tech/eslint-config'

CONFIG.push({
  ignores: [
    '**/__fixtures__/**',
    '**/dist/**',
  ],
})

export default CONFIG
