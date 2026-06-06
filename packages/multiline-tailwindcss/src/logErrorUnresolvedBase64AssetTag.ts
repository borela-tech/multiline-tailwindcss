import {dedentAndStrip} from '@borela-tech/ts-toolbox'
import {logError} from './logError'
import type * as t from '@babel/types'

export function logErrorUnresolvedBase64AssetTag(
  filePath: string,
  location: t.SourceLocation,
  reason?: string,
) {
  const {column, line} = location.start
  const fullLocation = `${filePath}:${line}:${column}`
  const reasonBlock = reason ? `Reason: ${reason}` : ''

  logError(
    dedentAndStrip`
      Could not resolve base64Asset at:
        ${fullLocation}
      ${reasonBlock} 
    `,
  )
}
