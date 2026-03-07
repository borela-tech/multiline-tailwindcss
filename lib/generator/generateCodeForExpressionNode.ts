import {generateCodeForNode} from './generateCodeForNode'
import type {ExpressionNode} from '../parser/ExpressionNode'

export function generateCodeForExpressionNode(node: ExpressionNode): string {
  return node.items
    .map(generateCodeForNode)
    .join('_')
    .trim()
}
