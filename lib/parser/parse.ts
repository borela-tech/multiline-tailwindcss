import {Node} from './Node'
import {parseArrayIndex} from './parseArrayIndex'
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
    const identifier = parseIdentifier(state)
    skipWhitespace(state)

    if (peek(state) === '[') {
      const indexItems = parseArrayIndex(state)
      const suffix = parseIdentifier(state)
      const arrayNode: Node = {
        indexItems: indexItems,
        name: identifier,
        suffix,
        type: 'Array',
      }
      ast.push(arrayNode)
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
