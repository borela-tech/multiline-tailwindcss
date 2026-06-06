import * as t from '@babel/types'
import {generate} from './babel/generate'
import {parseTypeScriptCode} from './parseTypeScriptCode'
import {transformTailwindClasses} from './transformTailwindClasses'
import {traverse} from './babel/traverse'
import type {NodePath} from '@babel/traverse'

export function transformJsxCssClasses(code: string, filePath = 'unknown') {
  const candidatesFound: string[] = []

  const ast = parseTypeScriptCode(code, filePath)

  traverse(ast, {
    JSXAttribute(path: NodePath<t.JSXAttribute>) {
      const {
        node: {
          name,
          value,
        },
      } = path

      if (!t.isJSXIdentifier(name) || name.name != 'className')
        return

      if (!t.isStringLiteral(value))
        return

      const transformed = transformTailwindClasses(value.value)
      const filtered = transformed
        .split(' ')
        .filter(Boolean)
        .map(x => x.replaceAll('"', '&quot;'))

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
