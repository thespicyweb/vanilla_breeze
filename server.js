const fastify = require('fastify')({
  logger: {
      transport:
        {
          target: 'pino-pretty',
          options: {
            translateTime: 'HH:MM:ss Z',
            ignore: 'pid,hostname',
            singleLine: true
          }
        }
    }
})
const fastifyStatic = require('@fastify/static')
const autoprefixer = require('autoprefixer')
const postcss = require('postcss')
const tailwindcss = require("tailwindcss")
const twConfig = require("./tailwind.config")
const prettier = require("prettier")
const path = require('path')


const containsSyntaxError = (message) => {
  return message.match("The `(.*?)` class does not exist.")
}

const handleSyntaxError = (message) => {
  return message.match(/The `(.*?)` class does not exist./)[1]
}

const processTailwindMarkup = async (source, twConfig, unknownUtilities) => {
  const utilityClause = unknownUtilities.map(unknownUtility => {
    return `.${unknownUtility} {\n  /* Unknown class .${unknownUtility} */\n}\n\n`
  })

  const combinedSource = `
    @tailwind components;

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
    result = await postcss([tailwindcss(twConfig), autoprefixer]).process(combinedSource, { from: "convert.css" })
    result = prettier.format(result.css, { parser: "css" })
  } catch (e) {
    console.warn(e.message)
    if (containsSyntaxError(e.message)) {
      return {
        unknownMatch: handleSyntaxError(e.message)
      }
    } else {
      return {
        errorMessage: "Unknown server error. Please double-check your source HTML and try again."
      }
    }
  }
  return {
    completed: true,
    output: result
  }
}

fastify
  .register(fastifyStatic, {
    root: path.join(__dirname, 'public')
  })
  .register(fastifyStatic, {
    root: path.join(__dirname, 'node_modules', '@shoelace-style/shoelace'),
    prefix: '/shoelace/',
    decorateReply: false // the reply decorator has been added by the first plugin registration
  })
  .register(require('@fastify/multipart'), {
    addToBody: true
  })
  .post('/tw-convert', async function (req, reply) {
    const source = req.body.source

    let completed = false
    let iterations = 0
    let unknownUtilities = []
    let result = null

    const newTwConfig = {...twConfig}
    //newTwConfig.darkMode = "media"

    while (!completed && iterations < 20) {
      console.log("iterations!")
      iterations++
      result = await processTailwindMarkup(source, newTwConfig, unknownUtilities)
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
