import * as t from '@babel/types'
import {getBase64DataString} from './getBase64DataString'
import {getQuasiText} from './getQuasiText'
import {logErrorUnresolvedBase64AssetTag} from './logErrorUnresolvedBase64AssetTag'
import {traverse} from './babel/traverse'
import type {NodePath} from '@babel/traverse'

export function processBase64AssetTag(filePath: string, fileNode: t.File) {
  traverse(fileNode, {
    TaggedTemplateExpression(nodePath: NodePath<t.TaggedTemplateExpression>) {
      const {
        loc: location,
        quasi: {
          expressions,
          quasis,
        },
        tag,
      } = nodePath.node

      try {
        if (!t.isIdentifier(tag) || tag.name !== 'base64Asset')
          return

        if (expressions.length > 0 || quasis.length > 1)
          throw new Error('base64Asset tag cannot be applied to dynamic template literals.')

        const targetPath = getQuasiText(quasis[0])
        const dataString = getBase64DataString(targetPath, filePath)

        nodePath.replaceWith(t.stringLiteral(dataString))
      } catch (error) {
        const message = error instanceof Error
          ? error.message
          : 'Unknown error.'

        logErrorUnresolvedBase64AssetTag(
          filePath,
          location!,
          message,
        )
      }
    },
  })
}
