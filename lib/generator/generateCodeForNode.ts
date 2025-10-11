import {AnyNode} from '../parser/AnyNode'
import {generateCodeForBracketedExpression} from './generateCodeForBracketedExpression'
import {generateCodeForCssProperty} from './generateCodeForCssProperty'
import {generateCodeForExpressionNode} from './generateCodeForExpressionNode'
import {generateCodeForFunction} from './generateCodeForFunction'
import {generateCodeForQuotedString} from './generateCodeForQuotedString'

export function generateCodeForNode(node: AnyNode): string {
  if (node.type === 'BracketedExpression')
    return generateCodeForBracketedExpression(node)

  if (node.type === 'Expression')
    return generateCodeForExpressionNode(node)

  if (node.type === 'Function')
    return generateCodeForFunction(node)

  if (node.type === 'CssProperty')
    return generateCodeForCssProperty(node)

  if (node.type === 'QuotedString')
    return generateCodeForQuotedString(node)

  // Identifier.
  return node.pseudoElement
    ? `${node.pseudoElement}:${node.value}`
    : node.value
}
