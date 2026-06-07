import * as t from '@babel/types'
import {collectResolvableValues} from './collectResolvableValues'
import {logErrorUnresolvedTailwindcssTag} from './logErrorUnresolvedTailwindcssTag'
import {resolveTemplateExpressions} from './resolveTemplateExpressions'
import {transformTailwindClasses} from './transformTailwindClasses'
import {traverse} from './babel/traverse'

export function processTailwindCssTags(filePath: string, fileNode: t.File) {
  const candidatesFound: string[] = []
  const resolvableValues = collectResolvableValues(fileNode)

  traverse(fileNode, {
    TaggedTemplateExpression(nodePath) {
      const {
        loc: location,
        quasi: {
          expressions,
          quasis,
        },
        tag,
      } = nodePath.node

      try {
        if (!t.isIdentifier(tag) || tag.name !== 'tailwindcss')
          return

        const resolvedString = resolveTemplateExpressions(
          quasis,
          expressions,
          resolvableValues,
        )

        const transformedCssClasses = transformTailwindClasses(resolvedString)
        const candidates = transformedCssClasses
          .split(' ')
          .filter(Boolean)

        candidatesFound.push(...candidates)

        nodePath.replaceWith(t.stringLiteral(transformedCssClasses))
      } catch (error) {
        const message = error instanceof Error
          ? error.message
          : 'Unknown error.'
        logErrorUnresolvedTailwindcssTag(
          filePath,
          location!,
          message,
        )
      }
    },
  })

  return candidatesFound
}
