import {CustomValueNode} from './CustomValueNode'
import {FunctionNode} from './FunctionNode'
import {IdentifierNode} from './IdentifierNode'

export type Node =
  | CustomValueNode
  | FunctionNode
  | IdentifierNode
