export function trimLines(strings: TemplateStringsArray) {
  const mergedParts = strings.join('')
  return mergedParts
    .split('\n')
    .map(str => str.replace(/\s\s+/g, ''))
    .filter(Boolean)
    .join('\n')
}
