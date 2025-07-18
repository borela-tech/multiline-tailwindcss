import {FunctionNode} from '../parser/FunctionNode'
import {generateCodeForNode} from './generateCodeForNode'

export function generateCodeForFunction(node: FunctionNode) {
  const args = node.args
    .map(generateCodeForNode)
    .join(',')
  return `${node.name}(${args})${node.suffix}`
}
