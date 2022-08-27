const fastify = require("fastify")({
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
        singleLine: true,
      },
    },
  },
})
const fastifyStatic = require("@fastify/static")
const autoprefixer = require("autoprefixer")
const postcss = require("postcss")
const tailwindcss = require("tailwindcss")
const defaultConfig = require("tailwindcss/defaultConfig")
const defaultTheme = defaultConfig.theme
//const originalTailwindConfig = require("./tailwind.config")
const twVarConfig = require("./twVarConfig")
const cloneDeep = require("tailwindcss/lib/util/cloneDeep").cloneDeep
const prettier = require("prettier")
const path = require("path")
const varExtractions = require("./twVarExtractions")
const defaultColors = require("tailwindcss/lib/public/colors").default

const containsSyntaxError = (message) => {
  return message.match("The `(.*?)` class does not exist.")
}

const handleSyntaxError = (message) => {
  return message
    .match(/The `(.*?)` class does not exist./)[1]
    .split(":")
    .at(-1)
}

const cssVars = (vars) =>
  Object.entries(vars)
    .map(([k, v]) => `${k}: ${v}`)
    .join(";\n")
    .trim() + ";"

const processTailwindMarkup = async (source, twConfig, globalPrefix, unknownUtilities) => {
  const utilityClause = unknownUtilities.map((unknownUtility) => {
    return `.${unknownUtility} {\n  /* Unknown class .${unknownUtility} */\n}\n\n`
  })

  const varGroups = []
  varGroups.push(varExtractions.extractVars(globalPrefix, "screen-", defaultTheme.screens))
  varGroups.push(
    varExtractions.extractColorVars(
      globalPrefix,
      twConfig.theme.referenceColors({ colors: defaultColors })
    )
  )
  varGroups.push(varExtractions.extractVars(globalPrefix, "size-", defaultTheme.spacing))
  varGroups.push(varExtractions.extractVars(globalPrefix, "width-", defaultTheme.columns))
  varGroups.push({
    [`--${globalPrefix}-width-prose`]: defaultTheme.maxWidth({
      theme: () => twConfig.theme,
      breakpoints: () => {},
    }).prose,
  })
  varGroups.push(
    varExtractions.extractFamilyVars(globalPrefix, "font-family-", defaultTheme.fontFamily)
  )
  varGroups.push(varExtractions.extractFontVars(globalPrefix, "font-size-", defaultTheme.fontSize))
  varGroups.push(varExtractions.extractVars(globalPrefix, "font-weight-", defaultTheme.fontWeight))
  varGroups.push(varExtractions.extractVars(globalPrefix, "line-height-", defaultTheme.lineHeight))
  varGroups.push(
    varExtractions.extractVars(globalPrefix, "border-radius-", defaultTheme.borderRadius)
  )

  const rootVars = `
    :root {
      ${varGroups.map((group) => cssVars(group)).join("\n")}
    }
  `

  const combinedSource = `
    ${rootVars}

    @layer tailwind-reset {
      @tailwind base;
    }
    @layer utilities {
${utilityClause}
    }
    @tailwind utilities;

    /* --CUSTOM-- */

    ${source}
  `

  let result
  try {
    result = await postcss([tailwindcss(twConfig), autoprefixer]).process(combinedSource, {
      from: "convert.css",
    })
    result = prettier.format(result.css, { parser: "css" })
  } catch (e) {
    console.warn(e.message)
    if (containsSyntaxError(e.message)) {
      return {
        unknownMatch: handleSyntaxError(e.message),
      }
    } else {
      return {
        errorMessage: "Unknown server error. Please double-check your source HTML and try again.",
      }
    }
  }
  return {
    completed: true,
    output: result,
  }
}

fastify
  .register(fastifyStatic, {
    root: path.join(__dirname, "public"),
  })
  .register(fastifyStatic, {
    root: path.join(__dirname, "node_modules", "@shoelace-style/shoelace"),
    prefix: "/shoelace/",
    decorateReply: false, // the reply decorator has been added by the first plugin registration
  })
  .register(require("@fastify/multipart"), {
    addToBody: true,
  })
  .post("/tw-convert", async function (req, reply) {
    const source = req.body.source
    const optionsJSON = req.body.options

    let completed = false
    let iterations = 0
    let unknownUtilities = []
    let result = null

    //const options = JSON.parse(optionsJSON)
    /** @type {import("tailwindcss").Config} */
    const newTwConfig = cloneDeep(defaultConfig)
    newTwConfig.theme.referenceColors = ({ colors }) => ({
      inherit: colors.inherit,
      current: colors.current,
      transparent: colors.transparent,
      black: colors.black,
      white: colors.white,
      primary: {
        50: "#eff6ff",
        100: "#dbeafe",
        200: "#bfdbfe",
        300: "#93c5fd",
        400: "#60a5fa",
        500: "#3b82f6",
        600: "#2563eb",
        700: "#1d4ed8",
        800: "#1e40af",
        900: "#1e3a8a",
        DEFAULT: "#3056d3",
      },
      slate: colors.slate,
      gray: colors.gray,
      zinc: colors.zinc,
      neutral: colors.neutral,
      stone: colors.stone,
      red: colors.red,
      orange: colors.orange,
      amber: colors.amber,
      yellow: colors.yellow,
      lime: colors.lime,
      green: colors.green,
      emerald: colors.emerald,
      teal: colors.teal,
      cyan: colors.cyan,
      sky: colors.sky,
      blue: colors.blue,
      indigo: colors.indigo,
      violet: colors.violet,
      purple: colors.purple,
      fuchsia: colors.fuchsia,
      pink: colors.pink,
      rose: colors.rose,
    })
    newTwConfig.theme.colors = twVarConfig.colors(req.body.prefix)
    newTwConfig.theme.spacing = twVarConfig.spacing(req.body.prefix, defaultTheme)
    newTwConfig.theme.columns = twVarConfig.columns(req.body.prefix, defaultTheme)
    newTwConfig.theme.maxWidth = twVarConfig.maxWidth(req.body.prefix, defaultTheme)
    newTwConfig.theme.fontFamily = twVarConfig.fontFamily(req.body.prefix, defaultTheme)
    newTwConfig.theme.fontSize = twVarConfig.fontSize(req.body.prefix, defaultTheme)
    newTwConfig.theme.fontWeight = twVarConfig.fontWeight(req.body.prefix, defaultTheme)
    newTwConfig.theme.lineHeight = twVarConfig.lineHeight(req.body.prefix, defaultTheme)
    newTwConfig.theme.borderRadius = twVarConfig.borderRadius(req.body.prefix, defaultTheme)
    newTwConfig.darkMode = "class"

    while (!completed && iterations < 20) {
      iterations++
      result = await processTailwindMarkup(source, newTwConfig, req.body.prefix, unknownUtilities)
      if (result.errorMessage) {
        return result.errorMessage
      } else if (result.unknownMatch) {
        unknownUtilities.push(result.unknownMatch)
      } else if (result.completed) {
        completed = true
      }
    }

    if (!completed) {
      console.warn(result.errorMessage)
      return "Unknown server error. Please double-check your source HTML and try again."
    }

    return result.output
  })

const start = async () => {
  try {
    await fastify.listen({ port: process.env["PORT"] || 4001 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
