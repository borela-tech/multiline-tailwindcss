import {next} from './next'
import {parseBracketedExpression} from './parseBracketedExpression'
import {parseFunction} from './parseFunction'
import {parseIdentifierNode} from './parseIdentifierNode'
import {peek} from './peek'
import {skipWhitespaceAndComments} from './skipWhitespaceAndComments'
import type {AnyNode} from './AnyNode'
import type {IdentifierNode} from '@lib/parser/IdentifierNode'
import type {MaybeNode} from './MaybeNode'
import type {State} from './State'

function skipDelimiters(state: State) {
  if (skipWhitespaceAndComments(state))
    return true

  if (peek(state) === '_') {
    next(state)
    return true
  }

  if (peek(state) === ',') {
    next(state)
    return true
  }

  return false
}

function resolveIdentifierNode(state: State, node: IdentifierNode) {
  if (peek(state) === '(')
    return parseFunction(state, node.value, node.prefix)

  if (peek(state) === '[')
    return parseBracketedExpression(state, node)

  return node
}

export function parse(input: string): AnyNode[] {
  const ast: AnyNode[] = []
  const state: State = {
    input,
    pos: 0,
  }

  let node: MaybeNode = undefined
  let prefix: MaybeNode = undefined

  while (state.pos < state.input.length) {
    if (skipDelimiters(state))
      continue

    node = peek(state) === '['
      ? parseBracketedExpression(state)
      : parseIdentifierNode(state)

    if (prefix)
      node.prefix = prefix

    if (node.type === 'Identifier')
      node = resolveIdentifierNode(state, node)

    if (peek(state) === ':') {
      next(state)
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
