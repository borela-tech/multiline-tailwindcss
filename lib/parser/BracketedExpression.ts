import {AnyNode} from './AnyNode'
import {ExpressionNode} from './ExpressionNode'

export interface BracketedExpression {
  prefix?: AnyNode
  type: 'BracketedExpression'
  value: ExpressionNode[]
}
