<p align="center">
  <picture>
    <source
      media="(prefers-color-scheme: dark)" 
      srcset="/assets/logo_dark_theme.svg"
      width=200
    >
    <source
      media="(prefers-color-scheme: light)" 
      srcset="/assets/logo_light_theme.svg"
      width=200
    >
    <img
      alt="multiline tailwind logo" 
      src="/assets/logo_light_theme.svg"
      width=200
    >
  </picture>
</p>

<p align="center">
  If you like this plugin, give it a star on GitHub and tell about it to your
  friends!
</p>

<p align="center">
  Plugins that allows tailwindcss classes to be broken into multiple lines.
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

