import {CssPropertyNode} from './CssPropertyNode'
import {BracketedExpression} from './BracketedExpression'
import {ExpressionNode} from './ExpressionNode'
import {FunctionNode} from './FunctionNode'
import {IdentifierNode} from './IdentifierNode'

export type AnyNode =
  | CssPropertyNode
  | BracketedExpression
  | ExpressionNode
  | FunctionNode
  | IdentifierNode
