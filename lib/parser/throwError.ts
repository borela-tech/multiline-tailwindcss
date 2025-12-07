import {State} from './State'
import {formatContext} from './formatContext'

export function throwError(state: State, message: string): never {
  throw new Error(formatContext(state, message))
}
