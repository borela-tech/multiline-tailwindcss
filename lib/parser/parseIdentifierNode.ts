import {parseIdentifier} from './parseIdentifier'
import type {IdentifierNode} from './IdentifierNode'
import type {State} from './State'

export function parseIdentifierNode(state: State): IdentifierNode {
  const identifier = parseIdentifier(state)
  return {
    type: 'Identifier',
    value: identifier,
  }
}
