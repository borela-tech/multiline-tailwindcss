import {FunctionNode} from './parser/FunctionNode'
import {IdentifierNode} from './parser/IdentifierNode'
import {NamedArrayNode} from './parser/NamedArrayNode'
import {Node} from './parser/Node'

function generateCodeForFunction(node: FunctionNode) {
  let result = node.name + '('
  result += node.args.map(generateCodeForNode).join(',')
  return result + ')' + node.suffix
}

function generateCodeForIdentifier(node: IdentifierNode) {
  return node.value
}

function generateCodeForNamedArray(node: NamedArrayNode) {
  let result = node.name + '['
  result += node.items.map(generateCodeForNode).join(',')
  return result + ']' + node.suffix
}

function generateCodeForNode(node: Node) {
  if (node.type === 'Function')
    return generateCodeForFunction(node)

  if (node.type === 'NamedArray')
    return generateCodeForNamedArray(node)

  return generateCodeForIdentifier(node)
}

export function generateCodeForNodes(nodes: Node[]) {
  let result = ''
  for (const node of nodes)
    result += generateCodeForNode(node) + '\n'
  return result
}
