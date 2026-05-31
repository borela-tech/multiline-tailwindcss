import * as fs from 'node:fs'
import {transformJsxCssClasses} from '@lib/transformJsxCssClasses'
import {transformTaggedStrings} from '@lib/transformTaggedStrings'

interface TransformResult {
  candidates: string[]
  code: string
  loader: 'jsx' | 'tsx'
}

export async function transformFile(
  filePath: string,
): Promise<TransformResult> {
  const buffer = await fs.promises.readFile(filePath)
  const rawContents = buffer.toString()

  const {
    candidatesFound: candidatesInJsx,
    transformedCode: {
      code: transformedJsx,
    },
  } = transformJsxCssClasses(rawContents, filePath)

  const {
    candidatesFound: candidatesInTaggedStrings,
    transformedCode: {
      code: transformedTaggedStrings,
    },
  } = transformTaggedStrings(transformedJsx, filePath)

  const loader =
    /\.tsx?$/.test(filePath)
      ? 'tsx'
      : 'jsx'

  return {
    candidates: [...candidatesInJsx, ...candidatesInTaggedStrings],
    code: transformedTaggedStrings,
    loader,
  }
}
