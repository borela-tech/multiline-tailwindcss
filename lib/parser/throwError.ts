import {formatContext} from './formatContext'
import {State} from './State'

export function throwError(state: State, message: string): never {
  throw new Error(formatContext(state, message))
}
