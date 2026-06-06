import type {AnyNode} from './AnyNode'
import type {FunctionArg} from './FunctionArg'

export interface FunctionNode {
  args: FunctionArg[]
  name: string
  prefix?: AnyNode
  type: 'Function'
}
