import {FunctionNode} from './FunctionNode'
import {IdentifierNode} from './IdentifierNode'
import {NamedArrayNode} from './NamedArrayNode'

export type Node =
  | FunctionNode
  | IdentifierNode
  | NamedArrayNode
