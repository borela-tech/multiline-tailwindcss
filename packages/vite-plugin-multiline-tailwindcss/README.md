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
   <a href="https://www.npmjs.com/package/@borela-tech/vite-plugin-multiline-tailwindcss">
     <img src="https://img.shields.io/npm/v/@borela-tech/vite-plugin-multiline-tailwindcss" alt="npm version">
   </a>
   <a href="https://github.com/borela-tech/vite-plugin-multiline-tailwindcss/blob/main/LICENSE.md">
     <img src="https://img.shields.io/npm/l/@borela-tech/vite-plugin-multiline-tailwindcss" alt="license">
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

## Table of Contents

- [Installation](#installation)
- [TypeScript Configuration](#typescript-configuration)
- [Vite Configuration](#vite-configuration)
- [Plugin Configuration](#plugin-configuration)
- [Setup](#setup)
- [Usage](#usage)
- [Features](#features)
  - [Spaces](#spaces)
  - [Comments](#comments)
- [Contributing](#contributing)
- [License](#license)

## Installation

```bash
npm install -D @borela-tech/vite-plugin-multiline-tailwindcss
```

## TypeScript Configuration

To get proper type support for the `tailwindcss` tagged template literal, add the
package to your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "types": [
      "@borela-tech/vite-plugin-multiline-tailwindcss"
    ]
  }
}
```

## Vite Configuration

Add the plugin to your Vite configuration:

```typescript
import react from '@vitejs/plugin-react'
import {defineConfig} from 'vite'
import {multilineTailwindCss} from '@borela-tech/vite-plugin-multiline-tailwindcss'

export default defineConfig({
  plugins: [
    // other plugins...
    react(),
    multilineTailwindCss(),
    // other plugins...
  ],
})
```

## Plugin Configuration

You can configure the plugin by passing options to the `multilineTailwindCss()` function.

### rootCssPath

The path to your root CSS file where Tailwind CSS is imported. Defaults to `src/index.css`.

```typescript
multilineTailwindCss({
  rootCssPath: 'src/index.css'
})
```

## Setup

Create your root CSS file and import [tailwindcss][tailwindcss]:

```css
@import "tailwindcss";
```

Then, include this file in your main entry point, typically `main.tsx` or `index.tsx`:

```js
import './index.css'
```

## Usage

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

## Features

### Spaces

Tailwind requires underscores (`_`) in place of spaces within arbitrary values.
With this plugin, you can write spaces directly, and they will be automatically
converted to underscores:

```jsx
<div className="bg-[size:4px 4px]">
  Content
</div>

// Becomes:

<div className="bg-[size:4px_4px]">
  Content
</div>
```

### Comments

The plugin supports `/* */` and `//` comments within multiline class strings:

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
  Content
</div>

// Becomes:

<div className="bg-red-500 text-white p-4">
  Content
</div>
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any
improvements or bug fixes.

## License

This project is licensed under the Apache 2.0 License. See the [LICENSE](LICENSE.md)
file for details.

[tailwindcss]: https://tailwindcss.com
