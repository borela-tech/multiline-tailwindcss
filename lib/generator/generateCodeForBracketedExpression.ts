import {BracketedExpression} from '../parser/BracketedExpression'
import {generateCodeForNode} from './generateCodeForNode'

export function generateCodeForBracketedExpression(node: BracketedExpression) {
  const name = node.name || ''
  const pseudoElement = node.pseudoElement || ''
  const fullName = pseudoElement
    ? `${pseudoElement}:${name}`
    : name
  const expression = generateCodeForNode(node.value)
  return `${fullName}[${expression}]`
}
