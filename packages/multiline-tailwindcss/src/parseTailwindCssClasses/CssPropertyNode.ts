import type {AnyNode} from './AnyNode'
import type {ExpressionNode} from './ExpressionNode'

export interface CssPropertyNode {
  name: string
  prefix?: AnyNode
  type: 'CssProperty'
  value: ExpressionNode
}
