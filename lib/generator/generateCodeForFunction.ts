import {FunctionNode} from '../parser/FunctionNode'
import {generateCodeForNode} from './generateCodeForNode'

export function generateCodeForFunction(node: FunctionNode) {
  let fullName = node.name
  if (node.prefix) {
    const prefix = generateCodeForNode(node.prefix)
    fullName = `${prefix}:${fullName}`
  }
  const args = node.args
    .map(generateCodeForNode)
    .join(',')
  return `${fullName}(${args})`
}
