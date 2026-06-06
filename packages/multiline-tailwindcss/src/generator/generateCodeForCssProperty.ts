import {generateCodeForNode} from './generateCodeForNode'
import type {CssPropertyNode} from '../CssPropertyNode'

export function generateCodeForCssProperty(node: CssPropertyNode) {
  const name = node.name || ''
  const value = generateCodeForNode(node.value)
  const base = `${name}:${value}`

  if (node.prefix) {
    const prefix = generateCodeForNode(node.prefix)
    return `${prefix}:${base}`
  }

  return base
}
