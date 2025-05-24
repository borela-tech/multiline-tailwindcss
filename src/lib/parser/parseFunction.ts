import {next} from './next'
import {Node} from './Node'
import {parseExpression} from './parseExpression'
import {parseIdentifier} from './parseIdentifier'
import {peek} from './peek'
import {skipWhitespace} from './skipWhitespace'
import {State} from './State'

export function parseFunction(state: State, name: string): Node {
  const args: Node[] = []
  next(state) // skip '('

  while (state.pos < state.input.length) {
    skipWhitespace(state)
    if (peek(state) === ')')
      break

    args.push(parseExpression(state))

    skipWhitespace(state)
    if (peek(state) === ',')
      next(state)
  }

  next(state) // skip ')'

  const suffix = parseIdentifier(state)
  return {
    args,
    name,
    suffix,
    type: 'Function',
  }
}
