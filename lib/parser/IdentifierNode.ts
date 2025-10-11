import {PrefixType} from './PrefixType'

export interface IdentifierNode {
  prefix?: PrefixType
  type: 'Identifier'
  value: string
}
