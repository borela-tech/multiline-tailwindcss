import {generateCodeForCustomValue} from './generateCodeForCustomValue'
import {generateCodeForFunction} from './generateCodeForFunction'
import {Node} from '../parser/Node'

export function generateCodeForNode(node: Node): string {
  if (node.type === 'Function')
    return generateCodeForFunction(node)

  if (node.type === 'CustomValue')
    return generateCodeForCustomValue(node)

  return node.value
}
