import {CustomValueNode} from '../parser/CustomValueNode'
import {generateCodeForNode} from './generateCodeForNode'

export function generateCodeForCustomValue(node: CustomValueNode) {
  const name = node.name || ''
  const pseudoElement = node.pseudoElement || ''
  const fullName = pseudoElement
    ? `${pseudoElement}:${name}`
    : name
  const indexItems = node.items
    .map(generateCodeForNode)
    .join(',')
  return `${fullName}[${indexItems}]${node.suffix}`
}
