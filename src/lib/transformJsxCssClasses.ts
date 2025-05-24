import * as t from '@babel/types'
import {NodePath} from '@babel/traverse'
import {parse} from '@babel/parser'
import {transformTailwindClasses} from './transformTailwindClasses'
import {JSXElement} from '@babel/types';

////////////////////////////////////////////////////////////////////////////////
// TODO: Remove this workaround when Babel modules get fixed.
// https://github.com/babel/babel/discussions/13093
import generatorModuleOrFunction from '@babel/generator'
import traverseModuleOrFunction from '@babel/traverse'

let generate = generatorModuleOrFunction
let traverse = traverseModuleOrFunction

if (typeof generatorModuleOrFunction != 'function')
  generate = (generatorModuleOrFunction as any).default as typeof generatorModuleOrFunction

if (typeof traverseModuleOrFunction != 'function')
  traverse = (traverseModuleOrFunction as any).default as typeof traverseModuleOrFunction
////////////////////////////////////////////////////////////////////////////////

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
        .split('\n')
        .filter(Boolean)

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
