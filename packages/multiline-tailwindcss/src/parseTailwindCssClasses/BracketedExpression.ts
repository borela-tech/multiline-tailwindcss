import type {AnyNode} from './AnyNode'
import type {ExpressionNode} from './ExpressionNode'

export interface BracketedExpression {
  prefix?: AnyNode
  type: 'BracketedExpression'
  value: ExpressionNode[]
}
