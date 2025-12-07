import {AnyNode} from './AnyNode'
import {CssPropertyNode} from './CssPropertyNode'
import {next} from './next'
import {parseExpression} from './parseExpression'
import {State} from './State'

export function parseCssProperty(
  state: State,
  name: string,
  prefix?: AnyNode,
): CssPropertyNode {
  next(state) // Skip ':'
  const value = parseExpression(state)
  return {
    name,
    prefix,
    type: 'CssProperty',
    value,
  }
}
