import * as t from '@babel/types'
import {NodePath} from '@babel/traverse'
import {parse} from '@babel/parser'
import {transformTailwindClasses} from './transformTailwindClasses'
import {TaggedTemplateExpression} from '@babel/types';

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

export function transformTaggedStrings(code: string) {
  const candidatesFound: string[] = []
  const ast = parse(code, {
    sourceType: 'module',
    plugins: [
      'jsx',
      'typescript',
    ],
  })

  traverse(ast, {
    TaggedTemplateExpression(path: NodePath<TaggedTemplateExpression>) {
      const {
        tag,
        quasi: {quasis},
      } = path.node

      if (!t.isIdentifier(tag))
        return

      if (tag.name !== 'tailwind')
        return

      if (quasis.length !== 1)
        throw new Error('Tailwind tagged template should have exactly one argument.')

      const rawString = quasis[0].value.raw
      const squished = transformTailwindClasses(rawString)
      const filtered = squished
        .split('\n')
        .filter(Boolean)

      candidatesFound.push(...filtered)

      const replacement = t.templateElement({
        raw: squished,
        cooked: squished,
      })

      path.replaceWith(
        t.templateLiteral([replacement], []),
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
