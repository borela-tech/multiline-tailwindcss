export function unindentString(
  string: string,
  indent = 2,
): string {
  const lines = string.split('\n')
  return lines.map(line => line.slice(indent))
    .join('\n')
    .trim()
}
