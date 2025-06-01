import {generateCodeForNode} from './generateCodeForNode'
import {ArrayNode} from '../parser/ArrayNode'

export function generateCodeForArray(node: ArrayNode) {
  const indexItems = node.indexItems
    .map(generateCodeForNode)
    .join(',')
  return `${node.name}[${indexItems}]${node.suffix}`
}
