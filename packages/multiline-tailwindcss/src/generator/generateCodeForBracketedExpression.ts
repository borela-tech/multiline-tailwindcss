import {generateCodeForNode} from './generateCodeForNode'
import type {BracketedExpression} from '../BracketedExpression'

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
