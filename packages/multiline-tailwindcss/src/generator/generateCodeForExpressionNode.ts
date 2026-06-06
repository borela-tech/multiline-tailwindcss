import {generateCodeForNode} from './generateCodeForNode'
import type {ExpressionNode} from '../parseTailwindCssClasses/ExpressionNode'

export function generateCodeForExpressionNode(node: ExpressionNode): string {
  return node.items
    .map(generateCodeForNode)
    .join('_')
    .trim()
}
