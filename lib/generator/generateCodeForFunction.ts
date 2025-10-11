import {FunctionNode} from '../parser/FunctionNode'
import {generateCodeForNode} from './generateCodeForNode'

export function generateCodeForFunction(node: FunctionNode) {
  let fullName = node.name
  if (node.prefix) {
    const prefixValue = typeof node.prefix === 'string'
      ? node.prefix
      : generateCodeForNode(node.prefix)
    fullName = `${prefixValue}:${fullName}`
  }
  const args = node.args
    .map(generateCodeForNode)
    .join(',')
  return `${fullName}(${args})`
}
