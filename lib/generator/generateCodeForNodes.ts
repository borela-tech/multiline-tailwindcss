import {AnyNode} from '../parser/AnyNode'
import {generateCodeForNode} from './generateCodeForNode'

export function generateCodeForNodes(nodes: AnyNode[]) {
  return nodes.map(node => generateCodeForNode(node))
    .join(' ')
    .trim()
}
