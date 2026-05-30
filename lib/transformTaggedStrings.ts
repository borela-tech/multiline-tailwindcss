import * as t from '@babel/types'
import {dedent} from '@borela-tech/ts-toolbox'
import {generate} from './babel/generate'
import {parseSync} from '@babel/core'
import {transformTailwindClasses} from './transformTailwindClasses'
import {traverse} from './babel/traverse'
import type {NodePath} from '@babel/traverse'

const PLUGIN_OPTIONS = {
  filename: 'file.tsx',
  presets: ['@babel/preset-react', '@babel/preset-typescript'],
  plugins: [['@babel/plugin-syntax-decorators', {version: '2023-11'}]],
}

function resolveTemplateExpressions(
  quasis: t.TemplateElement[],
  expressions: t.Expression[],
  resolvableValues: Map<string, string>,
) {
  let result = ''

  for (let i = 0; i < quasis.length; i++) {
    result += quasis[i].value.cooked || ''

    if (i < expressions.length) {
      const expression = expressions[i]

      if (!t.isIdentifier(expression))
        return null

      const value = resolvableValues.get(expression.name)
      if (value === undefined)
        return null

      result += value
    }
  }

  return result
}

function warnUnresolved(location: t.SourceLocation, filePath = 'unknown') {
  const column = location.start.column
  const line = location.start.line
  const fullLocation = `${filePath}:${line}:${column}`
  console.warn(
    dedent`
      Could not resolve all expressions in tailwindcss template at ${fullLocation}.
      The template will be left unchanged.
    `,
  )
}

export function transformTaggedStrings(code: string, filePath?: string) {
  const candidatesFound: string[] = []
  const resolvableValues = new Map<string, string>()

  const ast = parseSync(code, {
    ...PLUGIN_OPTIONS,
    filename: filePath || PLUGIN_OPTIONS.filename,
  })!

  traverse(ast, {
    VariableDeclarator(path: NodePath<t.VariableDeclarator>) {
      const {id, init} = path.node
      if (t.isIdentifier(id) && t.isStringLiteral(init))
        resolvableValues.set(id.name, init.value)
    },
  })

  traverse(ast, {
    TaggedTemplateExpression(path) {
      const {
        loc: location,
        quasi: {expressions, quasis},
        tag,
      } = path.node

      if (!t.isIdentifier(tag) || tag.name !== 'tailwindcss')
        return

      let text
      if (quasis.length > 1) {
        const resolved = resolveTemplateExpressions(
          quasis,
          expressions as t.Expression[],
          resolvableValues,
        )

        if (resolved === null) {
          warnUnresolved(location!, filePath)
          return
        }

        text = resolved
      } else
        text = quasis[0].value.cooked ?? quasis[0].value.raw

      const transformed = transformTailwindClasses(text)
      candidatesFound.push(...transformed.split(' ').filter(Boolean))
      path.replaceWith(t.stringLiteral(transformed))
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
