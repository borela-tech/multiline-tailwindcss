import {AnyNode} from './AnyNode'
import {ExpressionNode} from './ExpressionNode'

export interface CssPropertyNode {
  name: string
  prefix?: AnyNode
  type: 'CssProperty'
  value: ExpressionNode
}
