import {Node} from './Node'

export interface CustomValueNode {
  items: Node[]
  name: string
  suffix: string
  type: 'CustomValue'
}
