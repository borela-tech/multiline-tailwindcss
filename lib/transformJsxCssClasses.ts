import * as t from '@babel/types'
import {generate} from './babel/generate'
import {NodePath} from '@babel/traverse'
import {parse} from '@babel/parser'
import {transformTailwindClasses} from './transformTailwindClasses'
import {traverse} from './babel/traverse'

export function transformJsxCssClasses(code: string) {
  const candidatesFound: string[] = []
  const ast = parse(code, {
    sourceType: 'module',
    plugins: [
      'jsx',
      'typescript',
    ],
  })

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

      value.value = filtered.join(' ')
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
