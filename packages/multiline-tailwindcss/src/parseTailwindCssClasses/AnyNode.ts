import type {BracketedExpression} from './BracketedExpression'
import type {CssPropertyNode} from './CssPropertyNode'
import type {ExpressionNode} from './ExpressionNode'
import type {FunctionNode} from './FunctionNode'
import type {IdentifierNode} from './IdentifierNode'
import type {QuotedStringNode} from './QuotedStringNode'

export type AnyNode =
  | BracketedExpression
  | CssPropertyNode
  | ExpressionNode
  | FunctionNode
  | IdentifierNode
  | QuotedStringNode
