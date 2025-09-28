import {AnyNode} from './AnyNode'
import {parseCssProperty} from './parseCssProperty'
import {parseFunction} from './parseFunction'
import {parseIdentifier} from './parseIdentifier'
import {peek} from './peek'
import {skipWhitespace} from './skipWhitespace'
import {State} from './State'

export function parseExpression(state: State): AnyNode {
  skipWhitespace(state)
  const identifier = parseIdentifier(state)
  skipWhitespace(state)

  if (peek(state) === '(')
    return parseFunction(state, identifier)

  if (peek(state) === ':')
    return parseCssProperty(state, identifier)

  return {
    type: 'Identifier',
    value: identifier,
  }
}
