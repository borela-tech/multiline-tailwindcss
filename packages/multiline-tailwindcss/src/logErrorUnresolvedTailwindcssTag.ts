import {dedentAndStrip} from '@borela-tech/ts-toolbox'
import {logError} from './logError'
import type * as t from '@babel/types'

export function logErrorUnresolvedTailwindcssTag(
  filePath: string,
  location: t.SourceLocation,
  reason?: string,
) {
  const column = location.start.column
  const line = location.start.line
  const fullLocation = `${filePath}:${line}:${column}`
  const reasonBlock = reason ? `Reason: ${reason}` : ''

  logError(
    dedentAndStrip`
      Could not resolve all expressions in tailwindcss template at:
        ${fullLocation}
      ${reasonBlock}
    `,
  )
}
