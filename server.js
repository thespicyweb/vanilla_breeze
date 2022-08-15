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
const path = require('path')

const util = require('util')
const exec = util.promisify(require('child_process').exec);
const { readFile, writeFile } = require('fs/promises')

fastify
  .register(require('@fastify/static'), {
    root: path.join(__dirname, 'public')
  })
  .register(require('@fastify/multipart'), {
    addToBody: true
  })
  .post('/tw-convert', async function (req, reply) {
    const source = req.body.source

    const combinedSource = `
      @tailwind base;

      /* --CUSTOM-- */

      ${source}
    `
    await writeFile('./tw/SERVER_source.css', combinedSource);

    const cmd = "npx tailwindcss -i ./tw/SERVER_source.css -o ./tw/SERVER_dest.css"
    try {
    const { stdout, stderr } = await exec(cmd);
    } catch (error) {
      if (error.message.includes("result = new CssSyntaxError")) {
        const mtch = error.message.match(/The `(.*?)` class does not exist./)
        return `Oops, the "${mtch[1]}" class in your input HTML is not a default Tailwind utility class.`
      } else {
        return "Unknown server error. Please double-check your input HTML and try again."
      }
    }

    return readFile("./tw/SERVER_dest.css")
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
