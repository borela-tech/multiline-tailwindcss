import {AnyNode} from './AnyNode'
import {ExpressionNode} from './ExpressionNode'
import {IdentifierNode} from './IdentifierNode'
import {next} from './next'
import {parseCssProperty} from './parseCssProperty'
import {parseFunction} from './parseFunction'
import {parseIdentifier} from './parseIdentifier'
import {parseQuotedString} from './parseQuotedString'
import {peek} from './peek'
import {skipWhitespace} from './skipWhitespace'
import {State} from './State'

export function parseExpression(state: State): ExpressionNode {
  const items: AnyNode[] = []

  while (state.pos < state.input.length) {
    skipWhitespace(state)

    if (/[\s,)\]]/.test(peek(state)))
      break

    if (/['"]/.test(peek(state))) {
      const quotedStringNode = parseQuotedString(state)
      items.push(quotedStringNode)
      continue
    }

    if (peek(state) === '_') {
      next(state) // Skip '_'
      continue
    }

    const identifier = parseIdentifier(state)

    if (peek(state) === ':') {
      const cssPropertyNode = parseCssProperty(
        state,
        identifier,
      )
      items.push(cssPropertyNode)
      continue
    }

    if (peek(state) === '(') {
      const functionNode = parseFunction(
        state,
        identifier,
      )
      items.push(functionNode)
      continue
    }

    const identifierNode: IdentifierNode = {
      type: 'Identifier',
      value: identifier,
    }
    items.push(identifierNode)
  }

  return {
    type: 'Expression',
    items,
  }
}
