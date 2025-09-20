import '@/lib/tailwindcss'
import * as fs from 'node:fs'
import path from 'node:path'
import {BuildResult, Plugin} from 'esbuild'
import {transformJsxCssClasses} from '@/lib/transformJsxCssClasses'
import {transformTaggedStrings} from '@/lib/transformTaggedStrings'

const blue = (text: string) => `\x1b[34m${text}\x1b[0m`
const red = (text: string) => `\x1b[31m${text}\x1b[0m`

const blueLogTag = blue('Multiline tailwindcss')
const redLogTag = red('Multiline tailwindcss')

function log(message: string) {
  console.log(`${blueLogTag} ${message}`)
}

function logError(message: string, error: Error) {
  console.error(`${redLogTag} ${message}`, error)
}

export const multilineTailwindCssPlugin: Plugin = {
  name: '@borela-tech/esbuild-plugin-multiline-tailwindcss',
  setup(build) {
    const collectedCandidates: string[] = []
    const outputDir = build.initialOptions.outdir || 'dist'
    const resolvedOutputDir = path.resolve(outputDir)

    log(`Ensuring output directory exists: ${resolvedOutputDir}`)

    if (!fs.existsSync(resolvedOutputDir))
      fs.mkdirSync(resolvedOutputDir, {recursive: true})

    build.onEnd((result: BuildResult) => {
      if (result.errors.length > 0)
        return

      if (collectedCandidates.length === 0)
        return

      const uniqueCandidates = Array.from(new Set(collectedCandidates))
      const sortedCandidates = uniqueCandidates.sort()
      const jsonString = JSON.stringify(sortedCandidates, null, 2)

      const candidatesFileName = 'tailwindcss.candidates.json'
      const candidatesFilePath = path.join(resolvedOutputDir, candidatesFileName)

      log(`Writing TailwindCSS candidates: ${candidatesFilePath}`)

      fs.writeFile(
        candidatesFilePath,
        jsonString,
        error => {
          if (error)
            logError('Error writing candidates file:', error)
        },
      )
    })

    build.onLoad({filter: /.[jt]sx?/}, async ({path}) => {
      const buffer = await fs.promises.readFile(path)
      const rawContents = buffer.toString()

      const {
        candidatesFound: candidatesInJsx,
        transformedCode: {
          code: transformedJsx,
        },
      } = transformJsxCssClasses(rawContents)

      const {
        candidatesFound: candidatesInTaggedStrings,
        transformedCode: {
          code: transformedTaggedStrings,
        },
      } = transformTaggedStrings(transformedJsx)

      collectedCandidates.push(
        ...candidatesInJsx,
        ...candidatesInTaggedStrings,
      )

      const LOADER =
        /\.tsx?$/.test(path)
          ? 'tsx'
          : 'jsx'

      return {
        contents: transformedTaggedStrings,
        loader: LOADER,
      }
    })
  },
}
