import {Node} from './Node'

export interface ArrayNode {
  indexItems: Node[]
  name: string
  suffix: string
  type: 'Array'
}
