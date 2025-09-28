import {FunctionArg} from './FunctionArg'

export interface FunctionNode {
  args: FunctionArg[]
  name: string
  pseudoElement?: string
  suffix: string
  type: 'Function'
}
