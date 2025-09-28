import {CssPropertyNode} from './CssPropertyNode'
import {CustomValueNode} from './CustomValueNode'
import {FunctionNode} from './FunctionNode'
import {IdentifierNode} from './IdentifierNode'

export type AnyNode =
  | CssPropertyNode
  | CustomValueNode
  | FunctionNode
  | IdentifierNode
