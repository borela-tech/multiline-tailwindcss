import {CssPropertyNodeValue} from './CssPropertyNodeValue'

export interface CssPropertyNode {
  name: string
  type: 'CssProperty'
  value: CssPropertyNodeValue
}
