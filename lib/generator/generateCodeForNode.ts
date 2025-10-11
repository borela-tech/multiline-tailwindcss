import {AnyNode} from '../parser/AnyNode'
import {generateCodeForCssProperty} from './generateCodeForCssProperty'
import {generateCodeForBracketedExpression} from './generateCodeForBracketedExpression'
import {generateCodeForExpressionNode} from './generateCodeForExpressionNode'
import {generateCodeForFunction} from './generateCodeForFunction'

export function generateCodeForNode(node: AnyNode): string {
  if (node.type === 'Expression')
    return generateCodeForExpressionNode(node)

  if (node.type === 'Function')
    return generateCodeForFunction(node)

  if (node.type === 'CssProperty')
    return generateCodeForCssProperty(node)

  if (node.type === 'CustomValue')
    return generateCodeForBracketedExpression(node)

  // Identifier.
  return node.pseudoElement
    ? `${node.pseudoElement}:${node.value}`
    : node.value
}
