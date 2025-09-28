import {CssPropertyNode} from '../parser/CssPropertyNode'
import {generateCodeForNode} from './generateCodeForNode'

export function generateCodeForCssProperty(node: CssPropertyNode) {
  const name = node.name || ''
  const value = node.value
    .map(generateCodeForNode)
    .join(' ')
  return `${name}:${value}`
}
