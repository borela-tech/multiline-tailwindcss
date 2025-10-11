import {BracketedExpression} from './BracketedExpression'
import {ExpressionNode} from './ExpressionNode'
import {next} from './next'
import {parseExpression} from './parseExpression'
import {peek} from './peek'
import {State} from './State'
import {skipWhitespace} from './skipWhitespace'
import {PrefixType} from '@/lib/parser/PrefixType'

export function parseBracketedExpression(
  state: State,
  prefix?: PrefixType,
): BracketedExpression {
  next(state) // Skip '['

  const expressions: ExpressionNode[] = []

  while (state.pos < state.input.length) {
    skipWhitespace(state)

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
