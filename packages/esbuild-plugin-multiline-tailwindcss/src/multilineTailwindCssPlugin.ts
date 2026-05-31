import {logInfo} from '@lib/logInfo'
import {transformFile} from './transformFile'
import {writeCandidatesFile} from '@lib/writeCandidatesFile'
import type {BuildResult} from 'esbuild'
import type {Plugin} from 'esbuild'

/**
 * Esbuild plugin to extract TailwindCSS class candidates from JSX and tagged
 * template literals.
 * @public
 * */
export const multilineTailwindCssPlugin: Plugin = {
  name: '@borela-tech/esbuild-plugin-multiline-tailwindcss',
  setup(build) {
    const collectedCandidates: string[] = []
    const outputDir = build.initialOptions.outdir || 'dist'

    logInfo(`Output directory: ${outputDir}`)

    build.onEnd((result: BuildResult) => {
      if (result.errors.length > 0)
        return

      if (collectedCandidates.length === 0)
        return

      writeCandidatesFile(outputDir, collectedCandidates)
    })

    build.onLoad({filter: /.[jt]sx?/}, async ({path: filePath}) => {
      const {candidates, code, loader} = await transformFile(filePath)

      collectedCandidates.push(...candidates)

      return {
        contents: code,
        loader,
      }
    })
  },
}
