import twColor from "tailwindcss/lib/util/color.js"
const { parseColor } = twColor

/* Converts HEX color to RGB */
const toRGB = (value) => parseColor(value).color.join(" ")

function extractColorVars(globalPrefix, colorObj, colorGroup = "") {
  return Object.keys(colorObj).reduce((vars, colorKey) => {
    const value = colorObj[colorKey]
    const cssVariable =
      colorKey === "DEFAULT"
        ? `--${globalPrefix}-color${colorGroup}`
        : `--${globalPrefix}-color${colorGroup}-${colorKey}`

    const newVars =
      typeof value === "string"
        ? { [cssVariable]: value.startsWith("#") ? toRGB(value) : value }
        : extractColorVars(globalPrefix, value, `-${colorKey}`)

    return { ...vars, ...newVars }
  }, {})
}

function extractVars(globalPrefix, prefix, varObj) {
  return Object.keys(varObj).reduce((vars, key) => {
    const value = varObj[key]
    const cssVariable = `--${globalPrefix}-${prefix}${key.toLowerCase().replace(".", "_")}`

    const newVars =
      typeof value === "string"
        ? { [cssVariable]: value }
        : extractVars(globalPrefix, prefix, value, `-${key}`)

    return { ...vars, ...newVars }
  }, {})
}

function extractFontVars(globalPrefix, prefix, varObj) {
  return Object.keys(varObj).reduce((vars, key) => {
    const value = varObj[key]
    const cssVariable = `--${globalPrefix}-${prefix}${key.replace(".", "_")}`

    const newVars = { [cssVariable]: value[0] }

    return { ...vars, ...newVars }
  }, {})
}

function extractFamilyVars(globalPrefix, prefix, varObj) {
  return Object.keys(varObj).reduce((vars, key) => {
    const value = varObj[key].join(", ")
    const cssVariable = `--${globalPrefix}-${prefix}${key.replace(".", "_")}`

    const newVars = { [cssVariable]: value }

    return { ...vars, ...newVars }
  }, {})
}

export { extractVars, extractColorVars, extractFamilyVars, extractFontVars }
