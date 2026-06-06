import {createRequire} from 'node:module'
import {parseSync} from '@babel/core'

// @babel/core resolves plugin/preset string names from the consumer's working
// directory and, that causes issues when you need to test this package with
//
// NPM doesn't install linked packages' transitive dependencies, so that
// resolution fails. To solve that, we load Babel modules from our own
// node_modules and pass the module objects directly.
const require = createRequire(import.meta.url)

const PLUGIN_OPTIONS = {
  plugins: [
    [require('@babel/plugin-syntax-decorators'), {version: '2023-11'}],
  ],
  presets: [
    require('@babel/preset-react'),
    require('@babel/preset-typescript'),
  ],
}

export function parseTypeScriptCode(code: string, filePath?: string) {
  return parseSync(code, {
    ...PLUGIN_OPTIONS,
    filename: filePath || 'file.tsx',
  })!
}
