import {AnyNode} from './AnyNode'

export interface ExpressionNode {
  items: AnyNode[]
  type: 'Expression'
}
