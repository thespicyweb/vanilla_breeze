# Vanilla Breeze

> [!NOTE]
> **2026 Update:** Tailwind 4 has largely eliminated the need to use a tool like this. It's a major rewrite oriented around real CSS variables and a CSS-based config. This a welcome development, and while technically there's still a use case for wanting to convert HTML-based utility classes to a stylesheet, we expect most Tailwind 4+ users will either author CSS using the new CSS variables from scratch, or use off-the-shelf TW-based components which are still using utility classes and not care. Either way, <strong>Vanilla Breeze</strong> was a fun hack and served its purpose in the pre-v4 days. I'm archiving the site & this repo. <em>Cheers! -Jared</em>

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

----

**NOTE:** currently this repo includes a Plausible analytics tag in the HTML head. If you decide to run the app yourself, please remove the tag so it won't interfere with our [production site](https://www.vanillabreeze.dev). Thank you!

(Why is this even an issue, you may ask? It's because with the exception of the client-side JavaScript, the website is entirely "buildless". This was an intentional choice. Cool in some ways, but one way it's not is that there's no ability to inject ENV vars and add templating logic accordingly. Oh well!)
