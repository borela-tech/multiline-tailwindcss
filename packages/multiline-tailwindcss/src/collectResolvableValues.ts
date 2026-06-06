import * as t from '@babel/types'
import {traverse} from './babel/traverse'
import type {NodePath} from '@babel/traverse'

export function collectResolvableValues(fileNode: t.File) {
  const resolvableValues = new Map<string, string>()

  traverse(fileNode, {
    VariableDeclarator(nodePath: NodePath<t.VariableDeclarator>) {
      const {id, init} = nodePath.node

      if (!t.isIdentifier(id))
        return

      if (!t.isStringLiteral(init))
        return

      resolvableValues.set(id.name, init.value)
    },
  })

  return resolvableValues
}
