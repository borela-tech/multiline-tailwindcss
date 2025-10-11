import {IdentifierNode} from './IdentifierNode'
import {parseIdentifier} from './parseIdentifier'
import {State} from './State'

export function parseIdentifierNode(state: State): IdentifierNode {
  const identifier = parseIdentifier(state)
  return {
    type: 'Identifier',
    value: identifier,
  }
}
