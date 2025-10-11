import {AnyNode} from '../parser/AnyNode'
import {generateCodeForBracketedExpression} from './generateCodeForBracketedExpression'
import {generateCodeForCssProperty} from './generateCodeForCssProperty'
import {generateCodeForExpressionNode} from './generateCodeForExpressionNode'
import {generateCodeForFunction} from './generateCodeForFunction'
import {generateCodeForQuotedString} from './generateCodeForQuotedString'

export function generateCodeForNode(node: AnyNode): string {
  switch (node.type) {
  case 'BracketedExpression':
    return generateCodeForBracketedExpression(node)
  case 'Expression':
    return generateCodeForExpressionNode(node)
  case 'Function':
    return generateCodeForFunction(node)
  case 'CssProperty':
    return generateCodeForCssProperty(node)
  case 'QuotedString':
    return generateCodeForQuotedString(node)
  case 'Identifier':
    if (node.prefix) {
      const prefix = generateCodeForNode(node.prefix)
      return `${prefix}:${node.value}`
    }
    return node.value
  }
}
