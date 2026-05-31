import * as fs from 'node:fs'
import path from 'node:path'
import {logError} from './logError'
import {logInfo} from './logInfo'

export function writeCandidatesFile(outputDir: string, candidates: string[]) {
  const resolvedOutputDir = path.resolve(outputDir)

  logInfo(`Ensuring output directory exists: ${resolvedOutputDir}`)

  if (!fs.existsSync(resolvedOutputDir))
    fs.mkdirSync(resolvedOutputDir, {recursive: true})

  const uniqueCandidates = Array.from(new Set(candidates))
  const sortedCandidates = uniqueCandidates.sort()
  const jsonString = JSON.stringify(sortedCandidates, null, 2)

  const CANDIDATES_FILE_NAME = 'tailwindcss.candidates.json'
  const candidatesFilePath = path.join(resolvedOutputDir, CANDIDATES_FILE_NAME)

  logInfo(`Writing TailwindCSS candidates: ${candidatesFilePath}`)

  fs.writeFile(
    candidatesFilePath,
    jsonString,
    error => {
      if (error)
        logError('Error writing candidates file:', error)
    },
  )
}
