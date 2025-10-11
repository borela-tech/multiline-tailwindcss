import {ExpressionNode} from './ExpressionNode'

export interface CssPropertyNode {
  name: string
  type: 'CssProperty'
  value: ExpressionNode
}
