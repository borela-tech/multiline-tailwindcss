import {AnyNode} from './AnyNode'
import {FunctionArg} from './FunctionArg'
import {FunctionNode} from './FunctionNode'
import {next} from './next'
import {parseExpression} from './parseExpression'
import {peek} from './peek'
import {skipWhitespaceAndComments} from './skipWhitespaceAndComments'
import {State} from './State'

export function parseFunction(
  state: State,
  name: string,
  prefix?: AnyNode,
): FunctionNode {
  next(state) // Skip '('

  const args: FunctionArg[] = []
  while (state.pos < state.input.length) {
    if (skipWhitespaceAndComments(state))
      continue

    if (peek(state) === ',') {
      next(state) // Skip ,
      continue
    }

    if (peek(state) === ')')
      break

    args.push(parseExpression(state))
  }

  next(state) // Skip ')'

  return {
    args,
    name,
    prefix,
    type: 'Function',
  }
}
