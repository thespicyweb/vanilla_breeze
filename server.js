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
const path = require('path')
const tmp = require('tmp-promise')

const util = require('util')
const exec = util.promisify(require('child_process').exec);
const { readFile, writeFile } = require('fs/promises')
const { file } = require('tmp')
const { rmdirSync } = require('fs')

const containsSyntaxError = (message) => {
  return message.includes("CssSyntaxError") && message.includes("class does not exist.")
}

const handleSyntaxError = (message) => {
  return message.match(/The `(.*?)` class does not exist./)[1]
}

const processTailwindMarkup = async (source, unknownUtilities) => {
  const utilityClause = unknownUtilities.map(unknownUtility => {
    return `.${unknownUtility} { /* Unknown class .${unknownUtility} */ }\n\n`
  })

  const combinedSource = `
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

  const o = await tmp.dir()
  console.log(o.path)
  const sourcePath = path.join(o.path, "source.css")
  const destPath = path.join(o.path, "dest.css")

  await writeFile(sourcePath, combinedSource)

  let cmdOutput = null
  const cmd = `npx tailwindcss -i ${sourcePath} -o ${destPath}`

  // For some reason, some systems return with stderr and others trigger a catch
  // so we much handle both conditions!

  try {
    cmdOutput = await exec(cmd)
    if (containsSyntaxError(cmdOutput.stderr)) {
      return {
        unknownMatch: handleSyntaxError(cmdOutput.stderr),
        tmpFolder: o.path
      }
    }
  } catch (error) {
    if (containsSyntaxError(error.message)) {
      return {
        unknownMatch: handleSyntaxError(error.message),
        tmpFolder: o.path
      }
    } else {
      console.warn(error.message)
      return {
        errorMessage: "Unknown server error. Please double-check your input HTML and try again.",
        tmpFolder: o.path
      }
    }
  }

  console.log(cmdOutput)

  return {
    completed: true,
    output: await readFile(destPath),
    tmpFolder: o.path
  }
}

const cleanupResult = (result) => {
  rmdirSync(result.tmpFolder, { recursive: true })
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

    while (!completed && iterations < 20) {
      console.log("iterations!")
      iterations++
      result = await processTailwindMarkup(source, unknownUtilities)
      if (result.errorMessage) {
        cleanupResult(result)
        return result.errorMessage
      } else if (result.unknownMatch) {
        unknownUtilities.push(result.unknownMatch)
      } else if (result.completed) {
        completed = true
      }
    }

    if (!completed) {
      console.warn(result.errorMessage)
      cleanupResult(result)
      return "Unknown server error. Please double-check your input HTML and try again."
    }

    cleanupResult(result)
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
