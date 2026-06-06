export function prepareRawExample(text: string): string[] {
  const blocks = text.split(/\n\s*\n/)
  const trimmedBlocks = blocks.map(
    block => block.split('\n')
      .map(line => line.trim())
      .join(' ')
      .trim(),
  )
  return trimmedBlocks.filter(block => block.length > 0)
}
