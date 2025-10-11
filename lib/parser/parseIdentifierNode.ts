import {IdentifierNode} from './IdentifierNode'
import {State} from './State'
import {parseIdentifier} from './parseIdentifier'

export function parseIdentifierNode(state: State): IdentifierNode {
  const identifier = parseIdentifier(state)
  return {
    type: 'Identifier',
    value: identifier,
  }
}
