import {AnyNode} from './AnyNode'
import {ExpressionNode} from './ExpressionNode'
import {next} from './next'
import {parseCssProperty} from './parseCssProperty'
import {parseFunction} from './parseFunction'
import {parseIdentifier} from './parseIdentifier'
import {parseQuotedString} from './parseQuotedString'
import {peek} from './peek'
import {skipComments} from './skipComments'
import {skipWhitespace} from './skipWhitespace'
import {State} from './State'

export function parseExpression(state: State): ExpressionNode {
  const items: AnyNode[] = []

  while (state.pos < state.input.length) {
    skipWhitespace(state)
    skipComments(state)

    if (/[\s,)\]]/.test(peek(state)))
      break

    if (/['"]/.test(peek(state))) {
      items.push(parseQuotedString(state))
      continue
    }

    if (peek(state) === '_') {
      next(state) // Skip '_'
      continue
    }

    const identifier = parseIdentifier(state)

    if (peek(state) === ':') {
      items.push(parseCssProperty(state, identifier))
      continue
    }

    if (peek(state) === '(') {
      items.push(parseFunction(state, identifier))
      continue
    }

    items.push({
      type: 'Identifier',
      value: identifier,
    })
  }

  return {
    type: 'Expression',
    items,
  }
}
