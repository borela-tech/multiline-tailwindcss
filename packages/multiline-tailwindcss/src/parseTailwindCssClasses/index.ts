import {next} from './next'
import {parseBracketedExpression} from './parseBracketedExpression'
import {parseIdentifierNode} from './parseIdentifierNode'
import {peek} from './peek'
import {resolveIdentifierNode} from './resolveIdentifierNode'
import {skipDelimiters} from './skipDelimiters'
import type {AnyNode} from './AnyNode'
import type {MaybeNode} from './MaybeNode'
import type {State} from './State'

export function parseTailwindCssClasses(input: string): AnyNode[] {
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
