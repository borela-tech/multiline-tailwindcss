import {ArrayNode} from './ArrayNode'
import {FunctionNode} from './FunctionNode'
import {IdentifierNode} from './IdentifierNode'

export type Node =
  | ArrayNode
  | FunctionNode
  | IdentifierNode
