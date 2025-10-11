import {ExpressionNode} from '../parser/ExpressionNode'
import {generateCodeForNode} from './generateCodeForNode'

export function generateCodeForExpressionNode(node: ExpressionNode): string {
  return node.items
    .map(generateCodeForNode)
    .join('_')
    .trim()
}
