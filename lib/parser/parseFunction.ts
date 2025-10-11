import {next} from './next'
import {FunctionArg} from './FunctionArg'
import {FunctionNode} from './FunctionNode'
import {parseExpression} from './parseExpression'
import {peek} from './peek'
import {skipWhitespace} from './skipWhitespace'
import {State} from './State'

export function parseFunction(
  state: State,
  name: string,
  pseudoElement?: string,
): FunctionNode {
  next(state) // Skip '('

  const args: FunctionArg[] = []
  while (state.pos < state.input.length) {
    skipWhitespace(state)
    if (peek(state) === ')')
      break

    args.push(parseExpression(state))

    skipWhitespace(state)
    if (peek(state) === ',')
      next(state)
  }

  next(state) // Skip ')'

  return {
    args,
    name,
    pseudoElement,
    type: 'Function',
  }
}
