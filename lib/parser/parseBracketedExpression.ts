import {BracketedExpression} from './BracketedExpression'
import {next} from './next'
import {parseExpression} from './parseExpression'
import {State} from './State'

export function parseBracketedExpression(
  state: State,
  name?: string,
): BracketedExpression {
  next(state) // Skip '['

  const expression = parseExpression(state)
  const node: BracketedExpression = {
    name,
    type: 'BracketedExpression',
    value: expression,
  }

  next(state) // Skip ']'
  return node
}
