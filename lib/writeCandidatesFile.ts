import * as fs from 'node:fs'
import path from 'node:path'
import {logError} from './logError'
import {logInfo} from './logInfo'

const CANDIDATES_FILE_NAME = 'tailwindcss.candidates.json'

export function writeCandidatesFile(outputDir: string, candidates: string[]) {
  const resolvedOutputDir = path.resolve(outputDir)

  logInfo(`Ensuring output directory exists: ${resolvedOutputDir}`)

  if (!fs.existsSync(resolvedOutputDir))
    fs.mkdirSync(resolvedOutputDir, {recursive: true})

  const uniqueCandidates = Array.from(new Set(candidates))
  const sortedCandidates = uniqueCandidates.sort()
  const jsonString = JSON.stringify(sortedCandidates, null, 2)

  const candidatesFilePath = path.join(resolvedOutputDir, CANDIDATES_FILE_NAME)

  logInfo(`Writing candidates file: ${candidatesFilePath}`)

  try {
    fs.writeFileSync(candidatesFilePath, jsonString)
  } catch (error) {
    logError('Error writing candidates file:', error as Error)
  }
}
