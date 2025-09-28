import {CustomValueNode} from '../parser/CustomValueNode'
import {generateCodeForNode} from './generateCodeForNode'

export function generateCodeForCustomValue(node: CustomValueNode) {
  const name = node.name || ''
  const indexItems = node.items
    .map(generateCodeForNode)
    .join(',')
  return `${name}[${indexItems}]${node.suffix}`
}
