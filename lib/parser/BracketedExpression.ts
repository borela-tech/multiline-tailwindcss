import {ExpressionNode} from './ExpressionNode'

export interface BracketedExpression {
  name?: string
  pseudoElement?: string
  type: 'CustomValue'
  value: ExpressionNode
}
