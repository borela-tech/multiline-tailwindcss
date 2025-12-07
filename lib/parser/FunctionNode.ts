import {AnyNode} from './AnyNode'
import {FunctionArg} from './FunctionArg'

export interface FunctionNode {
  args: FunctionArg[]
  name: string
  prefix?: AnyNode
  type: 'Function'
}
