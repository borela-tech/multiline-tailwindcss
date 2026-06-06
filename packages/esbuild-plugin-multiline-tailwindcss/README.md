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
     <img src="https://github.com/borela-tech/multiline-tailwindcss/workflows/CI/badge.svg" alt="CI">
   </a>
   <a href="https://www.npmjs.com/package/@borela-tech/esbuild-plugin-multiline-tailwindcss">
     <img src="https://img.shields.io/npm/v/@borela-tech/esbuild-plugin-multiline-tailwindcss" alt="npm version">
   </a>
   <a href="https://github.com/borela-tech/multiline-tailwindcss/blob/main/LICENSE.md">
     <img src="https://img.shields.io/npm/l/@borela-tech/esbuild-plugin-multiline-tailwindcss" alt="license">
   </a>
</p>

<p align="center">
  <em>
    If you like this plugin, give it a star on GitHub and tell your friends about
    it!
  </em>
</p>

An [esbuild](https://esbuild.github.io/) plugin for libraries and packages that
use TailwindCSS. Write multiline classes. They are compiled into a single line
and candidates are written to a JSON file for consumers.

```bash
npm install -D @borela-tech/esbuild-plugin-multiline-tailwindcss
```

## Table of Contents

- [Quick Start](#quick-start)
  - [tsdown](#tsdown)
  - [tsup](#tsup)
- [Candidates File](#candidates-file)
- [Usage](#usage)
  - [JSX](#jsx)
  - [Tagged Strings](#tagged-strings)
    - [tailwindcss](#tailwindcss)
    - [base64Asset](#base64asset)
- [Features](#features)
  - [Spaces](#spaces)
  - [Comments](#comments)
- [Contributing](#contributing)
- [License](#license)

## Quick Start

### tsdown

```typescript
import {defineConfig} from 'tsdown'
import {multilineTailwindCssPlugin} from '@borela-tech/esbuild-plugin-multiline-tailwindcss'

export default defineConfig({
  esbuildPlugins: [multilineTailwindCssPlugin],
})
```

### tsup

```typescript
import {defineConfig} from 'tsup'
import {multilineTailwindCssPlugin} from '@borela-tech/esbuild-plugin-multiline-tailwindcss'

export default defineConfig({
  esbuildPlugins: [multilineTailwindCssPlugin],
})
```

## Candidates File

After building, a `tailwindcss.candidates.json` file is generated containing all
TailwindCSS classes used in the package. Consumers import it via `@source`:

```css
@import "tailwindcss";
@source "../node_modules/some-package/**/tailwindcss.candidates.json";
```

## Usage

### JSX

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
        theme(colors.zinc.900/15%) 1px,
        transparent 1px,
      ),
      linear-gradient(
        to top,
        theme(colors.zinc.900/15%) 1px,
        transparent 1px,
      ),
    ]
    bg-[size:4px 4px]
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

### Tagged Strings

Tags are transformed at build time; the runtime function is never called in
production. If a tag isn't processed (the plugin isn't configured for that
file), it returns a descriptive error string as a fallback.

#### tailwindcss

```js
import {tailwindcss} from '@borela-tech/multiline-tailwindcss'

const STYLES = tailwindcss`
  bg-[
    linear-gradient(
      to right,
      theme(colors.purple.600),
      theme(colors.purple.900),
    ),
  ]
  p-4
`

// Becomes:
const STYLES = `bg-[linear-gradient(to_right,theme(colors.purple.600),theme(colors.purple.900))] p-4`
```

#### base64Asset

```js
import {base64Asset} from '@borela-tech/multiline-tailwindcss'

const NOISE = base64Asset`../assets/noise.png`
// Becomes:
const NOISE = `data:image/png;base64,iVBORw0KGgo...`
```

## Features

### Spaces

Tailwind requires underscores (`_`) in place of spaces within arbitrary values;
however, with this plugin you use spaces directly:

```jsx
<div className="bg-[size:4px 4px]">

// Becomes:

<div className="bg-[size:4px_4px]">
```

### Comments

`/* */` and `//` comments are supported within multiline class strings:

```jsx
<div className="
  bg-red-500
  // This is a comment
  text-white
  /**
   * Another comment
   */
  p-4
">

// Becomes:

<div className="bg-red-500 text-white p-4">
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for
any improvements or bug fixes.

## License

This project is licensed under the Apache 2.0 License. See the
[LICENSE](../LICENSE.md) file for details.

[tailwindcss]: https://tailwindcss.com
