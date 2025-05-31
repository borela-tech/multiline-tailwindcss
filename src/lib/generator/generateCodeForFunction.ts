import {FunctionNode} from '../parser/FunctionNode'
import {generateCodeForNode} from './generateCodeForNode'

export function generateCodeForFunction(node: FunctionNode) {
  let result = node.name + '('
  result += node.args.map(generateCodeForNode).join(',')
  return result + ')' + node.suffix
}
