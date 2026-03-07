import * as t from '@babel/types'
import {generate} from './babel/generate'
import {parseSync} from '@babel/core'
import {transformTailwindClasses} from './transformTailwindClasses'
import {traverse} from './babel/traverse'
import type {NodePath} from '@babel/traverse'

export function transformJsxCssClasses(code: string, filePath?: string) {
  const candidatesFound: string[] = []

  const ast = parseSync(code, {
    filename: filePath || 'file.tsx',
    presets: [
      '@babel/preset-react',
      '@babel/preset-typescript',
    ],
    plugins: [
      ['@babel/plugin-syntax-decorators', {version: '2023-11'}],
    ],
  })!

  traverse(ast, {
    JSXAttribute(path: NodePath<t.JSXAttribute>) {
      const {
        node: {
          name,
          value,
        },
      } = path

      if (!t.isJSXIdentifier(name))
        return

      if (name.name != 'className')
        return

      if (!t.isStringLiteral(value))
        return

      const transformed = transformTailwindClasses(value.value)
      const filtered = transformed
        .split(' ')
        .filter(Boolean)
        .map(x => x.replace(/"/g, '&quot;'))

      candidatesFound.push(...filtered)

      value.extra ||= {}
      value.extra.raw = `"${filtered.join(' ')}"`
    },
  })

  const {
    code: transformedCode,
    map: transformedCodeMap,
  } = generate(ast, {}, code)

  return {
    candidatesFound,
    transformedCode: {
      code: transformedCode,
      map: transformedCodeMap,
    },
  }
}
