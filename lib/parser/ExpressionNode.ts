import type {AnyNode} from './AnyNode'

export interface ExpressionNode {
  items: AnyNode[]
  type: 'Expression'
}
