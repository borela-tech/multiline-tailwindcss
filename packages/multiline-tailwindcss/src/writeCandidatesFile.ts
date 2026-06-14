import {existsSync} from 'node:fs'
import {join} from 'node:path'
import {logError} from './logError'
import {logInfo} from './logInfo'
import {mkdirSync} from 'node:fs'
import {resolve} from 'node:path'
import {writeFileSync} from 'node:fs'

const CANDIDATES_FILE_NAME = 'tailwindcss.candidates.json'

/** @public */
export function writeCandidatesFile(
  directoryPath: string,
  candidates: string[],
) {
  const resolvedDirectoryPath = resolve(directoryPath)

  if (!existsSync(resolvedDirectoryPath))
    mkdirSync(resolvedDirectoryPath, {recursive: true})

  const uniqueCandidates = Array.from(new Set(candidates))
  const sortedCandidates = uniqueCandidates.sort()
  const jsonString = JSON.stringify(sortedCandidates, null, 2)

  const candidatesFilePath = join(
    resolvedDirectoryPath,
    CANDIDATES_FILE_NAME,
  )

  logInfo(`Writing candidates file: ${candidatesFilePath}`)

  try {
    writeFileSync(candidatesFilePath, jsonString)
  } catch (error) {
    logError('Error writing candidates file:', error as Error)
  }
}
