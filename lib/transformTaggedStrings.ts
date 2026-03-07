import * as t from '@babel/types'
import {generate} from './babel/generate'
import {parseSync} from '@babel/core'
import {transformTailwindClasses} from './transformTailwindClasses'
import {traverse} from './babel/traverse'
import type {NodePath} from '@babel/traverse'

export function transformTaggedStrings(code: string, filePath?: string) {
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
    TaggedTemplateExpression(path: NodePath<t.TaggedTemplateExpression>) {
      const {
        tag,
        quasi: {quasis},
      } = path.node

      if (!t.isIdentifier(tag))
        return

      if (tag.name !== 'tailwindcss')
        return

      if (quasis.length !== 1)
        throw new Error('Tailwind tagged template should have exactly one argument.')

      const value = quasis[0].value.cooked || ''
      const transformed = transformTailwindClasses(value)
      const filtered = transformed
        .split(' ')
        .filter(Boolean)

      candidatesFound.push(...filtered)

      path.replaceWith(
        t.stringLiteral(transformed),
      )
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
