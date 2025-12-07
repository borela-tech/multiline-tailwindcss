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

  let node: AnyNode | undefined = undefined
  let prefix: AnyNode | undefined = undefined

  while (state.pos < state.input.length) {
    if (skipWhitespaceAndComments(state))
      continue

    if (peek(state) === ',') {
      next(state) // Skip ','
      continue
    }

    node = peek(state) === '['
      ? parseBracketedExpression(state)
      : parseIdentifierNode(state)

    if (prefix)
      node.prefix = prefix

    if (node.type === 'Identifier') {
      if (peek(state) === '(')
        node = parseFunction(state, node.value, node.prefix)
      else if (peek(state) === '[')
        node = parseBracketedExpression(state, node)
    }

    if (peek(state) === ':') {
      next(state) // Skip ':'
      prefix = node
      node = undefined
      continue
    }

    ast.push(node)
    node = undefined
    prefix = undefined
  }

  return ast
}
