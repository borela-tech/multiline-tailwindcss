import {generateCodeForNode} from './generateCodeForNode'
import {Node} from '../parser/Node'

export function generateCodeForNodes(nodes: Node[]) {
  return nodes.map(node => generateCodeForNode(node))
    .join(' ')
}
