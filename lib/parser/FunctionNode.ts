import {PrefixType} from './PrefixType'
import {FunctionArg} from './FunctionArg'

export interface FunctionNode {
  args: FunctionArg[]
  name: string
  prefix?: PrefixType
  type: 'Function'
}
