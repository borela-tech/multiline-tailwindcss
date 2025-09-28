import {Node} from './Node'
import {parseCustomValue} from './parseCustomValue'
import {parseFunction} from './parseFunction'
import {parseIdentifier} from './parseIdentifier'
import {peek} from './peek'
import {skipWhitespace} from './skipWhitespace'
import {State} from './State'

export function parse(input: string): Node[] {
  const ast: Node[] = []
  const state: State = {
    input,
    pos: 0,
  }

  while (state.pos < state.input.length) {
    skipWhitespace(state)

    if (peek(state) === '[') {
      const items = parseCustomValue(state)
      const suffix = parseIdentifier(state)
      const customValueNode: Node = {
        items,
        name: undefined,
        suffix,
        type: 'CustomValue',
      }
      ast.push(customValueNode)
      continue
    }

    const identifier = parseIdentifier(state)

    if (peek(state) === '[') {
      const items = parseCustomValue(state)
      const suffix = parseIdentifier(state)
      const customValueNode: Node = {
        items,
        name: identifier,
        suffix,
        type: 'CustomValue',
      }
      ast.push(customValueNode)
      continue
    }

    if (peek(state) === '(') {
      const functionNode = parseFunction(state, identifier)
      ast.push(functionNode)
      continue
    }

    const identifierNode: Node = {
      type: 'Identifier',
      value: identifier,
    }
    ast.push(identifierNode)
  }

  return ast
}
