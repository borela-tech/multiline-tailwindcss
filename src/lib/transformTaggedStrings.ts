import * as t from '@babel/types'
import {generate} from './babel/generate'
import {NodePath} from '@babel/traverse'
import {parse} from '@babel/parser'
import {transformTailwindClasses} from './transformTailwindClasses'
import {traverse} from './babel/traverse'

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
    TaggedTemplateExpression(path: NodePath<t.TaggedTemplateExpression>) {
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
      const transformed = transformTailwindClasses(rawString)
      const filtered = transformed
        .split('\n')
        .filter(Boolean)

      candidatesFound.push(...filtered)

      const replacement = t.templateElement({
        raw: transformed,
        cooked: transformed,
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
