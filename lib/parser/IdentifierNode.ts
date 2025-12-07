import {AnyNode} from './AnyNode'

export interface IdentifierNode {
  prefix?: AnyNode
  type: 'Identifier'
  value: string
}
