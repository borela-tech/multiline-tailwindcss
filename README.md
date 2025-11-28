<p align="center">
  <picture>
    <source
      media="(prefers-color-scheme: dark)" 
      srcset="https://raw.githubusercontent.com/borela-tech/multiline-tailwindcss/refs/heads/main/assets/logo_dark_theme.svg"
      width=200
    >
    <source
      media="(prefers-color-scheme: light)" 
      srcset="https://raw.githubusercontent.com/borela-tech/multiline-tailwindcss/refs/heads/main/assets/logo_light_theme.svg"
      width=200
    >
    <img
      alt="multiline tailwind logo" 
      src="https://raw.githubusercontent.com/borela-tech/multiline-tailwindcss/refs/heads/main/assets/logo_light_theme.svg"
      width=200
    >
  </picture>
</p>

<p align="center">
  <a href="https://github.com/borela-tech/multiline-tailwindcss/actions">
    <img src="https://github.com/borela-tech/multiline-tailwindcss/workflows/ci.yml/badge.svg" alt="CI">
  </a>
</p>

<p align="center">
  <em>
    If you like this plugin, give it a star on GitHub and tell about it to your
    friends!
  </em>
</p>

<p align="center">
  A <a href="https://vite.dev/">Vite</a> plugin that allows <a href="https://tailwindcss.com/">tailwindcss</a> 
  classes to be broken into multiple lines.
</p>

## Vite

[Vite Plugin][vite-plugin] for [Vite][vite] that allows you to break [tailwindcss][tailwindcss]
classes into multiple lines. 

## ESBuild

[This plugin][esbuild-plugin] is useful for creating packages — like UI libraries
— that depend on [tailwindcss][tailwindcss]. It generates a `tailwindcss.candidates.json`
file, which lists all Tailwind classes used in the package. Other projects can
then import this file to ensure those classes are included when generating the
final CSS.

Like the Vite plugin, it allows [tailwindcss][tailwindcss] classes to be broken
into multiple lines. Works with [Tsup][tsup] or any project that uses [esbuild][esbuild].

### Usage

The plugin will search for the className attribute in your JSX/TSX files and
transform the classes into a single line.

```jsx
<div className="
  bg-[
    linear-gradient(
      to right,
      theme(colors.purple.600),
      theme(colors.purple.900),
    ),
  ]
">
  <div className="
    bg-[
      linear-gradient(
        to right,
        theme(colors.zinc.900/15%)_1px,
        transparent_1px,
      ),
      linear-gradient(
        to top,
        theme(colors.zinc.900/15%)_1px,
        transparent_1px,
      ),
    ]
    bg-[size:4px_4px]
    p-4
  ">
    Some content
  </div>
</div>

// Becomes:

<div className="bg-[linear-gradient(to_right,theme(colors.purple.600),theme(colors.purple.900))]">
  <div className="bg-[linear-gradient(to_right,theme(colors.zinc.900/15%)_1px,transparent_1px),linear-gradient(to_top,theme(colors.zinc.900/15%)_1px,transparent_1px)] bg-[size:4px_4px] p-4">
    Some content
  </div>
</div>
```

The parser supports `/* */` and `//` comments within multiline Tailwind class strings. For example:

```jsx
<div className="
  bg-red-500
  // This is a comment
  text-white
  /* Another comment */
  p-4
">
  Content
</div>
```

Alternatively, you can use the `tailwindcss` tag to transform string literals:

```js
// It is not necessary to import the tailwind tag, it is declared globally and
// the plugin only uses it to know which string literals to transform. This
// function is never called at runtime.

const BODY_CSS = tailwindcss`
  bg-[
    linear-gradient(
      to right,
      theme(colors.purple.600),
      theme(colors.purple.900),
    ),
  ]
`

// Becomes:

const BODY_CSS = `bg-[linear-gradient(to_right,theme(colors.purple.600),theme(colors.purple.900))]`
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any
improvements or bug fixes.

## License

This project is licensed under the Apache 2.0 License. See the [LICENSE](LICENSE.md)
file for details.

[esbuild]: https://esbuild.github.io
[esbuild-plugin]: ./packages/esbuild-plugin-multiline-tailwindcss
[tailwindcss]: https://tailwindcss.com
[tsup]: https://tsup.egoist.dev
[vite]: https://vite.dev
[vite-plugin]: ./packages/vite-plugin-multiline-tailwindcss

