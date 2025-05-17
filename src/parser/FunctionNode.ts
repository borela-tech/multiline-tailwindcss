import {Node} from './Node'

export type FunctionNode = {
  type: 'Function'
  name: string
  args: Node[]
  suffix: string
}
