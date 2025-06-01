import {transformTaggedStrings} from '../transformTaggedStrings'
import {trimLines} from './utils/trimLines'

describe('extractCandidatesFromTaggedStrings()', () => {
  it('extracts candidates from tagged strings', () => {
    const input = `
      const SOME_CSS = tailwind\`
        absolute
        !bg-[
          linear-gradient(
            to_right,
            theme(colors.zinc.900/50%),
            transparent,
          ),
          linear-gradient(
            to_right,
            theme(colors.purple.600/70%),
            theme(colors.purple.800/20%)_32px,
            transparent_50%,
          ),
        ]
        !border-purple-600
      \`
    `

    const transformedCode = trimLines`const SOME_CSS = \`absolute
      !bg-[linear-gradient(to_right,theme(colors.zinc.900/50%),transparent),linear-gradient(to_right,theme(colors.purple.600/70%),theme(colors.purple.800/20%)_32px,transparent_50%)]
      !border-purple-600\`;
    `

    const expected = {
      candidatesFound: [
        'absolute',
        '!bg-[linear-gradient(to_right,theme(colors.zinc.900/50%),transparent),linear-gradient(to_right,theme(colors.purple.600/70%),theme(colors.purple.800/20%)_32px,transparent_50%)]',
        '!border-purple-600',
      ],
      transformedCode: {
        code: transformedCode,
        map: null,
      },
    }

    const result = transformTaggedStrings(input)
    expect(result).toEqual(expected)
  })
})
