import {CssPropertyNode} from '../parser/CssPropertyNode'
import {generateCodeForNode} from './generateCodeForNode'

export function generateCodeForCssProperty(node: CssPropertyNode) {
  const name = node.name || ''
  const value = generateCodeForNode(node.value)
  const base = `${name}:${value}`
  if (node.prefix) {
    const prefixValue = typeof node.prefix === 'string'
      ? node.prefix
      : generateCodeForNode(node.prefix)
    return `${prefixValue}:${base}`
  }
  return base
}
