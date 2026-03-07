import {formatContext} from './formatContext'
import type {State} from './State'

export function throwError(state: State, message: string): never {
  throw new Error(formatContext(state, message))
}
