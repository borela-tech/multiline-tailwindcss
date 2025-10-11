import {BracketedExpression} from './BracketedExpression'
import {CssPropertyNode} from './CssPropertyNode'
import {ExpressionNode} from './ExpressionNode'
import {FunctionNode} from './FunctionNode'
import {IdentifierNode} from './IdentifierNode'

export type AnyNode =
  | BracketedExpression
  | CssPropertyNode
  | ExpressionNode
  | FunctionNode
  | IdentifierNode
