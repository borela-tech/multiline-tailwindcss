import {generateCodeForArray} from './generateCodeForArray'
import {generateCodeForFunction} from './generateCodeForFunction'
import {Node} from './parser/Node'

export function generateCodeForNode(node: Node) {
  if (node.type === 'Function')
    return generateCodeForFunction(node)

  if (node.type === 'Array')
    return generateCodeForArray(node)

  return node.value
}
