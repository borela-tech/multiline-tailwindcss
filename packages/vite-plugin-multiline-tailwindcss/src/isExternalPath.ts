import {resolve} from 'node:path'
import {sep} from 'node:path'

export function isExternalPath(path: string, root: string): boolean {
  const resolvedPath = resolve(path)
  const resolvedRoot = resolve(root) + sep
  return !resolvedPath.startsWith(resolvedRoot)
}
