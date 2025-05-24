import {Node} from './Node'

export type FunctionNode = {
  args: Node[]
  name: string
  suffix: string
  type: 'Function'
}
