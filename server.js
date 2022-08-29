import fastify from "fastify"
import fastifyStatic from "@fastify/static"
import fastifyMultipart from "@fastify/multipart"
import path from "path"
import { fileURLToPath } from "url"
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
import defaultConfig from "tailwindcss/defaultConfig.js"
const defaultTheme = defaultConfig.theme
import twCloneDeep from "tailwindcss/lib/util/cloneDeep.js"
const { cloneDeep } = twCloneDeep
import {
  colors,
  spacing,
  columns,
  maxWidth,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  borderRadius,
} from "./server/twVarConfig.js"
import processTailwindMarkup from "./server/processTailwindMarkup.js"

const app = fastify({
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

app
  .addHook("onRequest", (request, reply, done) => {
    // We'll redirect everything to www. — except for the manifest which is a healthcheck for Railway
    if (!request.hostname.startsWith("www") && !request.url.startsWith("/manifest.json")) {
      reply.redirect(`${request.protocol}://www.${request.hostname}${request.url}`)
    } else {
      done()
    }
  })
  .register(fastifyStatic, {
    root: path.join(__dirname, "public"),
  })
  .register(fastifyStatic, {
    root: path.join(__dirname, "node_modules", "@shoelace-style/shoelace"),
    prefix: "/shoelace/",
    decorateReply: false, // the reply decorator has been added by the first plugin registration
  })
  .register(fastifyStatic, {
    root: path.join(__dirname, "node_modules", "open-props"),
    prefix: "/open-props/",
    decorateReply: false, // the reply decorator has been added by the first plugin registration
  })
  .register(fastifyMultipart, {
    addToBody: true,
  })
  .post("/tw-convert", async function (req, reply) {
    const source = req.body.source
    const optionsJSON = req.body.options

    let completed = false
    let iterations = 0
    let unknownUtilities = []
    let result = null

    const options = JSON.parse(optionsJSON)
    console.info(options)
    /** @type {import("tailwindcss").Config} */
    const newTwConfig = cloneDeep(defaultConfig)

    newTwConfig.theme.colors = colors(req.body.prefix, newTwConfig.theme, options)
    newTwConfig.theme.spacing = spacing(req.body.prefix, newTwConfig.theme)
    newTwConfig.theme.columns = columns(req.body.prefix, newTwConfig.theme)
    newTwConfig.theme.maxWidth = maxWidth(req.body.prefix, newTwConfig.theme)
    newTwConfig.theme.fontFamily = fontFamily(req.body.prefix, newTwConfig.theme)
    newTwConfig.theme.fontSize = fontSize(req.body.prefix, newTwConfig.theme)
    newTwConfig.theme.fontWeight = fontWeight(req.body.prefix, newTwConfig.theme)
    newTwConfig.theme.lineHeight = lineHeight(req.body.prefix, newTwConfig.theme)
    newTwConfig.theme.borderRadius = borderRadius(req.body.prefix, newTwConfig.theme)
    newTwConfig.darkMode = "class"

    while (!completed && iterations < 20) {
      iterations++
      result = await processTailwindMarkup(
        source,
        newTwConfig,
        options,
        req.body.prefix,
        unknownUtilities
      )
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
    await app.listen({ host: "0.0.0.0", port: process.env["PORT"] || 4001 })
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}
start()
