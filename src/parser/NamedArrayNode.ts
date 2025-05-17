import {Node} from './Node'

export type NamedArrayNode = {
  type: 'NamedArray'
  name: string
  items: Node[]
  suffix: string
}
