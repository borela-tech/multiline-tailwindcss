import {State} from './State'

export function formatContext(state: State, message: string): string {
  const lines = state.input.split('\n')
  let currentLine = 0
  let currentPos = 0
  let lineStart = 0

  for (let i = 0; i < lines.length; i++) {
    const lineLength = lines[i].length + 1 // +1 for \n
    if (currentPos + lineLength > state.pos) {
      currentLine = i
      lineStart = currentPos
      break
    }
    currentPos += lineLength
  }

  const column = state.pos - lineStart
  const startLine = Math.max(0, currentLine - 5)
  const endLine = Math.min(lines.length - 1, currentLine + 5)

  let result = ''

  for (let i = startLine; i <= endLine; i++) {
    const lineNumberGutter = `${i + 1}| `
    const lineNumberGutterLength = lineNumberGutter.length
    const line = `${lineNumberGutter}${lines[i]}\n`

    result += line

    if (i === currentLine) {
      result += ' '.repeat(lineNumberGutterLength + column) + '^\n'
      result += ' '.repeat(lineNumberGutterLength) + message + '\n'
    }
  }

  return result.trim()
}
