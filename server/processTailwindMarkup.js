import merge from "deepmerge"
import autoprefixer from "autoprefixer"
import postcss from "postcss"
import tailwindcss from "tailwindcss"
import defaultConfig from "tailwindcss/defaultConfig.js"
const defaultTheme = defaultConfig.theme
import prettier from "prettier"
import {
  extractVars,
  extractColorVars,
  extractFamilyVars,
  extractFontVars,
} from "./twVarExtractions.js"
import { defaultColors, primaryColors } from "./twVarConfig.js"

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

const processTailwindMarkup = async (source, twConfig, options, globalPrefix, unknownUtilities) => {
  const utilityClause = unknownUtilities.map((unknownUtility) => {
    return `.${unknownUtility} {\n  /* Unknown class .${unknownUtility} */\n}\n\n`
  })

  const varGroups = []
  varGroups.push(extractVars(globalPrefix, "screen-", defaultTheme.screens))
  varGroups.push(
    extractColorVars(
      globalPrefix,
      merge({ ...defaultColors, primary: primaryColors }, options.extraColors ?? {})
    )
  )
  varGroups.push(extractVars(globalPrefix, "size-", defaultTheme.spacing))
  varGroups.push(extractVars(globalPrefix, "width-", defaultTheme.columns))
  varGroups.push({
    [`--${globalPrefix}-width-prose`]: defaultTheme.maxWidth({
      theme: () => twConfig.theme,
      breakpoints: () => {},
    }).prose,
  })
  varGroups.push(extractFamilyVars(globalPrefix, "font-family-", defaultTheme.fontFamily))
  varGroups.push(extractFontVars(globalPrefix, "font-size-", defaultTheme.fontSize))
  varGroups.push(extractVars(globalPrefix, "font-weight-", defaultTheme.fontWeight))
  varGroups.push(extractVars(globalPrefix, "line-height-", defaultTheme.lineHeight))
  varGroups.push(extractVars(globalPrefix, "border-radius-", defaultTheme.borderRadius))

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

export default processTailwindMarkup
