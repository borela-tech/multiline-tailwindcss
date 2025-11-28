import {BracketedExpression} from '../parser/BracketedExpression'
import {generateCodeForNode} from './generateCodeForNode'

export function generateCodeForBracketedExpression(node: BracketedExpression) {
  const prefix = node.prefix
    ? generateCodeForNode(node.prefix)
    : ''
  const expressions = node.value
    .map(generateCodeForNode)
    .join(',')
  let separator = ''
  if (prefix) {
    if (!prefix.endsWith('-'))
      separator = ':'
  }
  return `${prefix}${separator}[${expressions}]`
}
