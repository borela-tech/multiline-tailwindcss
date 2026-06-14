import type {NodeError} from './NodeError'

export function isNodeError(error: unknown): error is NodeError {
  if (error === null)
    return false

  if (typeof error !== 'object')
    return false

  return 'code' in error
}
