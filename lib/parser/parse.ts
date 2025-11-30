import {AnyNode} from './AnyNode'
import {next} from './next'
import {parseBracketedExpression} from './parseBracketedExpression'
import {parseFunction} from './parseFunction'
import {parseIdentifierNode} from './parseIdentifierNode'
import {peek} from './peek'
import {skipWhitespaceAndComments} from './skipWhitespaceAndComments'
import {State} from './State'

export function parse(input: string): AnyNode[] {
  const ast: AnyNode[] = []
  const state: State = {input, pos: 0}

  while (state.pos < state.input.length) {
    skipWhitespaceAndComments(state)

    if (peek(state) === ',') {
      next(state) // Skip ','
      skipWhitespaceAndComments(state)
      continue
    }

    let node =
      peek(state) === '['
        ? parseBracketedExpression(state)
        : parseIdentifierNode(state)

    while (peek(state) === ':') {
      next(state)
      const prefix = node
      node = peek(state) === '['
        ? parseBracketedExpression(state)
        : parseIdentifierNode(state)
      node.prefix = prefix
    }

    if (node.type === 'BracketedExpression') {
      ast.push(node)
      continue
    }

    if (peek(state) === '[') {
      ast.push(parseBracketedExpression(state, node))
      continue
    }

    if (peek(state) === '(') {
      ast.push(parseFunction(state, node.value, node.prefix))
      continue
    }

    if (node.type === 'Identifier' && node.value === '')
      continue

    ast.push(node)
  }

  return ast
}
