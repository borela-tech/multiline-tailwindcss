import {ExpressionNode} from './ExpressionNode'

export interface BracketedExpression {
  name?: string
  pseudoElement?: string
  type: 'BracketedExpression'
  value: ExpressionNode
}
