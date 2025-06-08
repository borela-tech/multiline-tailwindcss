import * as fs from 'node:fs'
import {Plugin} from 'esbuild'
import {transformJsxCssClasses} from '@/lib/transformJsxCssClasses'
import {transformTaggedStrings} from '@/lib/transformTaggedStrings'

export const multilineTailwindCssPlugin: Plugin = {
  name: '@borela-tech/esbuild-plugin-multiline-tailwind-css',
  setup(build) {
    build.onLoad({filter: /.[jt]sx?/}, async ({path}) => {
      const buffer = await fs.promises.readFile(path)
      const rawContents = buffer.toString()

      const {
        transformedCode: {
          code: transformedJsx,
        },
      } = transformJsxCssClasses(rawContents)

      const {
        transformedCode: {
          code: transformedTaggedStrings,
        }
      } = transformTaggedStrings(transformedJsx)

      const LOADER = /\.tsx?$/.test(path)
        ? 'tsx'
        : 'jsx'

      return {
        contents: transformedTaggedStrings,
        loader: LOADER,
      }
    })
  },
}
