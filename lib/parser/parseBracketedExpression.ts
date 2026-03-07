import {next} from './next'
import {parseExpression} from './parseExpression'
import {peek} from './peek'
import {skipWhitespaceAndComments} from './skipWhitespaceAndComments'
import type {AnyNode} from './AnyNode'
import type {BracketedExpression} from './BracketedExpression'
import type {ExpressionNode} from './ExpressionNode'
import type {State} from './State'

export function parseBracketedExpression(
  state: State,
  prefix?: AnyNode,
): BracketedExpression {
  next(state) // Skip '['

  const expressions: ExpressionNode[] = []

  while (state.pos < state.input.length) {
    if (skipWhitespaceAndComments(state))
      continue

    if (peek(state) === ',') {
      next(state) // Skip ','
      continue
    }

    if (peek(state) === ']')
      break

    const expression = parseExpression(state)
    expressions.push(expression)
  }

  const node: BracketedExpression = {
    prefix,
    type: 'BracketedExpression',
    value: expressions,
  }

  next(state) // Skip ']'
  return node
}
