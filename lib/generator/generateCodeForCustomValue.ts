import {CustomValueNode} from '../parser/CustomValueNode'
import {generateCodeForNode} from './generateCodeForNode'

export function generateCodeForCustomValue(node: CustomValueNode) {
  const indexItems = node.items
    .map(generateCodeForNode)
    .join(',')
  return `${node.name}[${indexItems}]${node.suffix}`
}
