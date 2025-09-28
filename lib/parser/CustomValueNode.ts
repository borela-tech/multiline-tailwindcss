import {CustomValueNodeItem} from './CustomValueNodeItem'

export interface CustomValueNode {
  items: CustomValueNodeItem[]
  name?: string
  pseudoElement?: string
  suffix: string
  type: 'CustomValue'
}
