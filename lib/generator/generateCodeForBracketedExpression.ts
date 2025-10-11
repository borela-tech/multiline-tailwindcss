import {BracketedExpression} from '../parser/BracketedExpression'
import {generateCodeForNode} from './generateCodeForNode'

export function generateCodeForBracketedExpression(node: BracketedExpression) {
  const name = node.name || ''
  const pseudoElement = node.pseudoElement || ''
  const fullName = pseudoElement
    ? `${pseudoElement}:${name}`
    : name
  const expressions = node.value
    .map(generateCodeForNode)
    .join(',')
  return `${fullName}[${expressions}]`
}
