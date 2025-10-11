import {BracketedExpression} from '../parser/BracketedExpression'
import {generateCodeForNode} from './generateCodeForNode'

export function generateCodeForBracketedExpression(node: BracketedExpression) {
  let prefix = ''
  if (node.prefix)
    prefix = generateCodeForNode(node.prefix)
  const expressions = node.value
    .map(generateCodeForNode)
    .join(',')
  return `${prefix}[${expressions}]`
}
