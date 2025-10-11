import {PrefixType} from './PrefixType'
import {ExpressionNode} from './ExpressionNode'

export interface BracketedExpression {
  prefix?: PrefixType
  type: 'BracketedExpression'
  value: ExpressionNode[]
}
