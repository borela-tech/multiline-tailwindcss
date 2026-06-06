import * as t from '@babel/types'

export function resolveTemplateExpressions(
  quasis: t.TemplateElement[],
  expressions: (t.Expression | t.TSType)[],
  resolvableValues: Map<string, string>,
) {
  let result = ''

  for (let i = 0; i < quasis.length; i++) {
    result += quasis[i].value.cooked || ''

    if (i < expressions.length) {
      const expression = expressions[i]

      if (!t.isIdentifier(expression))
        throw new Error(`Expected identifier, got: ${expression.type}`)

      const value = resolvableValues.get(expression.name)
      if (value === undefined)
        throw new Error(`Could not resolve value for identifier: ${expression.name}`)

      result += value
    }
  }

  return result
}
