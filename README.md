# Vanilla Breeze

## A Tailwind to Vanilla CSS Converter

```
CssSyntaxError: tailwindcss: /Users/jared/apps/SPICYREPOS/vanilla-breeze/tw/source.css:51:3: The `check-icon` class does not exist. If `check-icon` is a custom class
```


----

An example of vanilla HTML, CSS, and JavaScript (plus a [Lit](https://lit.dev) example) with zero build tooling, yet using a "modern" web development workflow courtesy of custom elements, CSS module scripts, and import maps.

**[View the Demo Site ➤](https://buildless-static.onrender.com)**

**[Read the Spicy Web Article ➤](https://www.spicyweb.dev/buildless-modern-development-workflows-are-this-close-to-a-reality/)**

----

To view this website locally, all you need is [Node](https://nodejs.org/en/).

First, install dependencies:

```shell
$ npm i
```

Then, run the web server:

```shell
$ npm run dev
```

Bear in mind that the Node web server has nothing to do with the functioning of the website, it's strictly for demoing purposes. You could use a web server written in Ruby, Go, Rust, use Nginx or Apache, whatever. The static site files in the `public` folder require zero build tooling and can served from anywhere.
