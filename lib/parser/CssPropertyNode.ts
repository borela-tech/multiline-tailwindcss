import {PrefixType} from './PrefixType'
import {ExpressionNode} from './ExpressionNode'

export interface CssPropertyNode {
  name: string
  prefix?: PrefixType
  type: 'CssProperty'
  value: ExpressionNode
}
