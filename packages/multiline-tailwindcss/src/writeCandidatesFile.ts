import * as fs from 'node:fs'
import path from 'node:path'
import {logError} from './logError'
import {logInfo} from './logInfo'

const CANDIDATES_FILE_NAME = 'tailwindcss.candidates.json'

/** @public */
export function writeCandidatesFile(
  directoryPath: string,
  candidates: string[],
) {
  const resolvedDirectoryPath = path.resolve(directoryPath)

  if (!fs.existsSync(resolvedDirectoryPath))
    fs.mkdirSync(resolvedDirectoryPath, {recursive: true})

  const uniqueCandidates = Array.from(new Set(candidates))
  const sortedCandidates = uniqueCandidates.sort()
  const jsonString = JSON.stringify(sortedCandidates, null, 2)

  const candidatesFilePath = path.join(
    resolvedDirectoryPath,
    CANDIDATES_FILE_NAME,
  )

  logInfo(`Writing candidates file: ${candidatesFilePath}`)

  try {
    fs.writeFileSync(candidatesFilePath, jsonString)
  } catch (error) {
    logError('Error writing candidates file:', error as Error)
  }
}
