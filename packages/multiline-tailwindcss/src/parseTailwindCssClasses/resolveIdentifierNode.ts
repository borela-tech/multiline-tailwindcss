import {parseBracketedExpression} from './parseBracketedExpression'
import {parseFunction} from './parseFunction'
import {peek} from './peek'
import type {IdentifierNode} from './IdentifierNode'
import type {State} from './State'

export function resolveIdentifierNode(state: State, node: IdentifierNode) {
  if (peek(state) === '(')
    return parseFunction(state, node.value, node.prefix)

  if (peek(state) === '[')
    return parseBracketedExpression(state, node)

  return node
}
