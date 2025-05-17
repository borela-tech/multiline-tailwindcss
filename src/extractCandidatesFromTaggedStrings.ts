import * as t from '@babel/types'
import generate from '@babel/generator'
import traverse from '@babel/traverse'
import {parse} from '@babel/parser'
import {squishMultilineExpressions} from './squishMultilineExpressions'

export function extractCandidatesFromTaggedStrings(code: string) {
  const candidatesFound: string[] = []
  const ast = parse(code, {
    sourceType: 'module',
    plugins: [
      'jsx',
      'typescript',
    ],
  })

  traverse(ast, {
    TaggedTemplateExpression(path) {
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
      const squished = squishMultilineExpressions(rawString)
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
