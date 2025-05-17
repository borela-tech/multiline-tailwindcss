import {squishMultilineExpressions} from '../squishMultilineExpressions'
import {trimLines} from './utils/trimLines'

describe('squishMultilineExpressions()', () => {
  it('affects only expressions', () => {
    const input = `
      absolute
      !bg-[
        linear-gradient(
          to_right,
          theme(colors.zinc.900/50%),
          transparent
        ),
        linear-gradient(
          to_right,
          theme(colors.purple.600/70%),
          theme(colors.purple.800/20%)_32px,
          transparent_50%
        )
      ]
      !border-purple-600
    `
    const expected = trimLines`
      absolute
      !bg-[linear-gradient(to_right,theme(colors.zinc.900/50%),transparent),linear-gradient(to_right,theme(colors.purple.600/70%),theme(colors.purple.800/20%)_32px,transparent_50%)]
      !border-purple-600
    `

    const result = squishMultilineExpressions(input)
    expect(result).toBe(expected)
  })
})
