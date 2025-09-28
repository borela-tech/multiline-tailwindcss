import {AnyNode} from '../parser/AnyNode'
import {generateCodeForCssProperty} from './generateCodeForCssProperty'
import {generateCodeForCustomValue} from './generateCodeForCustomValue'
import {generateCodeForFunction} from './generateCodeForFunction'

export function generateCodeForNode(node: AnyNode): string {
  if (node.type === 'Function')
    return generateCodeForFunction(node)

  if (node.type === 'CssProperty')
    return generateCodeForCssProperty(node)

  if (node.type === 'CustomValue')
    return generateCodeForCustomValue(node)

  // Identifier.
  return node.pseudoElement
    ? `${node.pseudoElement}:${node.value}`
    : node.value
}
