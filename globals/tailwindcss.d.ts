export {}

/**
 * Tag function used to identify template literals containing TailwindCSS class
 * candidates that can be extracted.
 * @public
 */
declare global {
  function tailwindcss(
    strings: TemplateStringsArray,
    ...expressions: unknown[]
  ): string
}
