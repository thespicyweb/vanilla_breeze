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

  const cmd = `npx tailwindcss -i ${sourcePath} -o ${destPath}`
  try {
    const { stdout, stderr } = await exec(cmd)
    console.log(stdout)

    return {
      completed: true,
      output: await readFile(destPath),
      tmpFolder: o.path
    }
  } catch (error) {
    if (error.message.includes("result = new CssSyntaxError") && error.message.includes ("class does not exist.")) {
      const mtch = error.message.match(/The `(.*?)` class does not exist./)
      return {
        unknownMatch: mtch[1],
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
    await fastify.listen({ port: 4001 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
