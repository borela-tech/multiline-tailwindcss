import {FunctionNode} from '../parser/FunctionNode'
import {generateCodeForNode} from './generateCodeForNode'

export function generateCodeForFunction(node: FunctionNode) {
  const fullName = node.pseudoElement
    ? `${node.pseudoElement}:${node.name}`
    : node.name
  const args = node.args
    .map(generateCodeForNode)
    .join(',')
  return `${fullName}(${args})${node.suffix}`
}
