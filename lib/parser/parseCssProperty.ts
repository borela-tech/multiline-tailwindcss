import {PrefixType} from './PrefixType'
import {CssPropertyNode} from './CssPropertyNode'
import {next} from './next'
import {State} from './State'
import {parseExpression} from './parseExpression'

export function parseCssProperty(
  state: State,
  name: string,
  prefix?: PrefixType,
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
