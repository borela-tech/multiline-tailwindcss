import {CssPropertyNodeValue} from './CssPropertyNodeValue'
import {CssPropertyNode} from './CssPropertyNode'
import {next} from './next'
import {parseFunction} from './parseFunction'
import {parseIdentifier} from './parseIdentifier'
import {peek} from './peek'
import {skipWhitespace} from './skipWhitespace'
import {State} from './State'

export function parseCssProperty(state: State, name: string): CssPropertyNode {
  next(state) // Skip ':'

  const value: CssPropertyNodeValue = []

  while (state.pos < state.input.length) {
    skipWhitespace(state)

    if (/[,\]]/.test(peek(state)))
      break

    const identifier = parseIdentifier(state)

    skipWhitespace(state)

    if (peek(state) === '(') {
      value.push(parseFunction(state, identifier))
      continue
    }

    value.push({
      type: 'Identifier',
      value: identifier,
    })
  }

  return {
    name,
    type: 'CssProperty',
    value,
  }
}
