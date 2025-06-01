import {Node} from './Node'

export interface FunctionNode {
  args: Node[]
  name: string
  suffix: string
  type: 'Function'
}
