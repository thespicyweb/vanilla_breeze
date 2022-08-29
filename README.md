# Vanilla Breeze

## A Tailwind to Vanilla CSS Converter

Available publicly at [vanillabreeze.dev](https://www.vanillabreeze.dev).

Or to run this application locally, all you need is [Node](https://nodejs.org/en/) v18+.

First, install dependencies:

```shell
$ npm i
```

Then, run the esbuild processes & web server in separate terminals:

```shell
$ npm run build -- --watch
```

```shell
$ npm run dev
```

Or in a production environment, you can kick off a one-time esbuild build and then start the server:

```shell
npm run deploy
```

Vanilla Breeze is currently in "early beta" so if you encounter any bugs or in particular if any standard-ish Tailwind markup doesn't convert well or at all, please file an issue so we can make improvements. Or better yet, submit a PR! 😃👍
