import {FunctionArg} from './FunctionArg'
import {FunctionNode} from './FunctionNode'
import {next} from './next'
import {parseExpression} from './parseExpression'
import {peek} from './peek'
import {PrefixType} from './PrefixType'
import {skipWhitespace} from './skipWhitespace'
import {State} from './State'

export function parseFunction(
  state: State,
  name: string,
  prefix?: PrefixType,
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
    prefix,
    type: 'Function',
  }
}
