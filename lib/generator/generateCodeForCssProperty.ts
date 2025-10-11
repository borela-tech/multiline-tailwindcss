import {CssPropertyNode} from '../parser/CssPropertyNode'
import {generateCodeForNode} from './generateCodeForNode'

export function generateCodeForCssProperty(node: CssPropertyNode) {
  const name = node.name || ''
  const value = generateCodeForNode(node.value)
  return `${name}:${value}`
}
