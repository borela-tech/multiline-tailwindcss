import {generateCodeForNode} from './generateCodeForNode'
import type {AnyNode} from '../parser/AnyNode'

export function generateCodeForNodes(nodes: AnyNode[]) {
  return nodes.map(node => generateCodeForNode(node))
    .join(' ')
    .trim()
}
