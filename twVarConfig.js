function breakpoints(screens) {
  return Object.keys(screens)
    .filter((key) => typeof screens[key] === "string")
    .reduce(
      (breakpoints, key) => ({
        ...breakpoints,
        [`screen-${key}`]: screens[key],
      }),
      {}
    )
}

function colors(globalPrefix) {
  // TODO, make this dynamic!
  return {
    inherit: `var(--${globalPrefix}-color-inherit)`,
    current: `var(--${globalPrefix}-color-current)`,
    transparent: `var(--${globalPrefix}-color-transparent)`,
    black: `rgb(var(--${globalPrefix}-color-black) / <alpha-value>)`,
    white: `rgb(var(--${globalPrefix}-color-white) / <alpha-value>)`,
    primary: {
      50: `rgb(var(--${globalPrefix}-color-primary-50) / <alpha-value>)`,
      100: `rgb(var(--${globalPrefix}-color-primary-100) / <alpha-value>)`,
      200: `rgb(var(--${globalPrefix}-color-primary-200) / <alpha-value>)`,
      300: `rgb(var(--${globalPrefix}-color-primary-300) / <alpha-value>)`,
      400: `rgb(var(--${globalPrefix}-color-primary-400) / <alpha-value>)`,
      500: `rgb(var(--${globalPrefix}-color-primary-500) / <alpha-value>)`,
      600: `rgb(var(--${globalPrefix}-color-primary-600) / <alpha-value>)`,
      700: `rgb(var(--${globalPrefix}-color-primary-700) / <alpha-value>)`,
      800: `rgb(var(--${globalPrefix}-color-primary-800) / <alpha-value>)`,
      900: `rgb(var(--${globalPrefix}-color-primary-900) / <alpha-value>)`,
      DEFAULT: "rgb(var(--tw-color-primary) / <alpha-value>)",
    },
    slate: {
      50: `rgb(var(--${globalPrefix}-color-slate-50) / <alpha-value>)`,
      100: `rgb(var(--${globalPrefix}-color-slate-100) / <alpha-value>)`,
      200: `rgb(var(--${globalPrefix}-color-slate-200) / <alpha-value>)`,
      300: `rgb(var(--${globalPrefix}-color-slate-300) / <alpha-value>)`,
      400: `rgb(var(--${globalPrefix}-color-slate-400) / <alpha-value>)`,
      500: `rgb(var(--${globalPrefix}-color-slate-500) / <alpha-value>)`,
      600: `rgb(var(--${globalPrefix}-color-slate-600) / <alpha-value>)`,
      700: `rgb(var(--${globalPrefix}-color-slate-700) / <alpha-value>)`,
      800: `rgb(var(--${globalPrefix}-color-slate-800) / <alpha-value>)`,
      900: `rgb(var(--${globalPrefix}-color-slate-900) / <alpha-value>)`,
    },
    gray: {
      50: `rgb(var(--${globalPrefix}-color-gray-50) / <alpha-value>)`,
      100: `rgb(var(--${globalPrefix}-color-gray-100) / <alpha-value>)`,
      200: `rgb(var(--${globalPrefix}-color-gray-200) / <alpha-value>)`,
      300: `rgb(var(--${globalPrefix}-color-gray-300) / <alpha-value>)`,
      400: `rgb(var(--${globalPrefix}-color-gray-400) / <alpha-value>)`,
      500: `rgb(var(--${globalPrefix}-color-gray-500) / <alpha-value>)`,
      600: `rgb(var(--${globalPrefix}-color-gray-600) / <alpha-value>)`,
      700: `rgb(var(--${globalPrefix}-color-gray-700) / <alpha-value>)`,
      800: `rgb(var(--${globalPrefix}-color-gray-800) / <alpha-value>)`,
      900: `rgb(var(--${globalPrefix}-color-gray-900) / <alpha-value>)`,
    },
    zinc: {
      50: `rgb(var(--${globalPrefix}-color-zinc-50) / <alpha-value>)`,
      100: `rgb(var(--${globalPrefix}-color-zinc-100) / <alpha-value>)`,
      200: `rgb(var(--${globalPrefix}-color-zinc-200) / <alpha-value>)`,
      300: `rgb(var(--${globalPrefix}-color-zinc-300) / <alpha-value>)`,
      400: `rgb(var(--${globalPrefix}-color-zinc-400) / <alpha-value>)`,
      500: `rgb(var(--${globalPrefix}-color-zinc-500) / <alpha-value>)`,
      600: `rgb(var(--${globalPrefix}-color-zinc-600) / <alpha-value>)`,
      700: `rgb(var(--${globalPrefix}-color-zinc-700) / <alpha-value>)`,
      800: `rgb(var(--${globalPrefix}-color-zinc-800) / <alpha-value>)`,
      900: `rgb(var(--${globalPrefix}-color-zinc-900) / <alpha-value>)`,
    },
    neutral: {
      50: `rgb(var(--${globalPrefix}-color-neutral-50) / <alpha-value>)`,
      100: `rgb(var(--${globalPrefix}-color-neutral-100) / <alpha-value>)`,
      200: `rgb(var(--${globalPrefix}-color-neutral-200) / <alpha-value>)`,
      300: `rgb(var(--${globalPrefix}-color-neutral-300) / <alpha-value>)`,
      400: `rgb(var(--${globalPrefix}-color-neutral-400) / <alpha-value>)`,
      500: `rgb(var(--${globalPrefix}-color-neutral-500) / <alpha-value>)`,
      600: `rgb(var(--${globalPrefix}-color-neutral-600) / <alpha-value>)`,
      700: `rgb(var(--${globalPrefix}-color-neutral-700) / <alpha-value>)`,
      800: `rgb(var(--${globalPrefix}-color-neutral-800) / <alpha-value>)`,
      900: `rgb(var(--${globalPrefix}-color-neutral-900) / <alpha-value>)`,
    },
    stone: {
      50: `rgb(var(--${globalPrefix}-color-stone-50) / <alpha-value>)`,
      100: `rgb(var(--${globalPrefix}-color-stone-100) / <alpha-value>)`,
      200: `rgb(var(--${globalPrefix}-color-stone-200) / <alpha-value>)`,
      300: `rgb(var(--${globalPrefix}-color-stone-300) / <alpha-value>)`,
      400: `rgb(var(--${globalPrefix}-color-stone-400) / <alpha-value>)`,
      500: `rgb(var(--${globalPrefix}-color-stone-500) / <alpha-value>)`,
      600: `rgb(var(--${globalPrefix}-color-stone-600) / <alpha-value>)`,
      700: `rgb(var(--${globalPrefix}-color-stone-700) / <alpha-value>)`,
      800: `rgb(var(--${globalPrefix}-color-stone-800) / <alpha-value>)`,
      900: `rgb(var(--${globalPrefix}-color-stone-900) / <alpha-value>)`,
    },
    red: {
      50: `rgb(var(--${globalPrefix}-color-red-50) / <alpha-value>)`,
      100: `rgb(var(--${globalPrefix}-color-red-100) / <alpha-value>)`,
      200: `rgb(var(--${globalPrefix}-color-red-200) / <alpha-value>)`,
      300: `rgb(var(--${globalPrefix}-color-red-300) / <alpha-value>)`,
      400: `rgb(var(--${globalPrefix}-color-red-400) / <alpha-value>)`,
      500: `rgb(var(--${globalPrefix}-color-red-500) / <alpha-value>)`,
      600: `rgb(var(--${globalPrefix}-color-red-600) / <alpha-value>)`,
      700: `rgb(var(--${globalPrefix}-color-red-700) / <alpha-value>)`,
      800: `rgb(var(--${globalPrefix}-color-red-800) / <alpha-value>)`,
      900: `rgb(var(--${globalPrefix}-color-red-900) / <alpha-value>)`,
    },
    orange: {
      50: `rgb(var(--${globalPrefix}-color-orange-50) / <alpha-value>)`,
      100: `rgb(var(--${globalPrefix}-color-orange-100) / <alpha-value>)`,
      200: `rgb(var(--${globalPrefix}-color-orange-200) / <alpha-value>)`,
      300: `rgb(var(--${globalPrefix}-color-orange-300) / <alpha-value>)`,
      400: `rgb(var(--${globalPrefix}-color-orange-400) / <alpha-value>)`,
      500: `rgb(var(--${globalPrefix}-color-orange-500) / <alpha-value>)`,
      600: `rgb(var(--${globalPrefix}-color-orange-600) / <alpha-value>)`,
      700: `rgb(var(--${globalPrefix}-color-orange-700) / <alpha-value>)`,
      800: `rgb(var(--${globalPrefix}-color-orange-800) / <alpha-value>)`,
      900: `rgb(var(--${globalPrefix}-color-orange-900) / <alpha-value>)`,
    },
    amber: {
      50: `rgb(var(--${globalPrefix}-color-amber-50) / <alpha-value>)`,
      100: `rgb(var(--${globalPrefix}-color-amber-100) / <alpha-value>)`,
      200: `rgb(var(--${globalPrefix}-color-amber-200) / <alpha-value>)`,
      300: `rgb(var(--${globalPrefix}-color-amber-300) / <alpha-value>)`,
      400: `rgb(var(--${globalPrefix}-color-amber-400) / <alpha-value>)`,
      500: `rgb(var(--${globalPrefix}-color-amber-500) / <alpha-value>)`,
      600: `rgb(var(--${globalPrefix}-color-amber-600) / <alpha-value>)`,
      700: `rgb(var(--${globalPrefix}-color-amber-700) / <alpha-value>)`,
      800: `rgb(var(--${globalPrefix}-color-amber-800) / <alpha-value>)`,
      900: `rgb(var(--${globalPrefix}-color-amber-900) / <alpha-value>)`,
    },
    yellow: {
      50: `rgb(var(--${globalPrefix}-color-yellow-50) / <alpha-value>)`,
      100: `rgb(var(--${globalPrefix}-color-yellow-100) / <alpha-value>)`,
      200: `rgb(var(--${globalPrefix}-color-yellow-200) / <alpha-value>)`,
      300: `rgb(var(--${globalPrefix}-color-yellow-300) / <alpha-value>)`,
      400: `rgb(var(--${globalPrefix}-color-yellow-400) / <alpha-value>)`,
      500: `rgb(var(--${globalPrefix}-color-yellow-500) / <alpha-value>)`,
      600: `rgb(var(--${globalPrefix}-color-yellow-600) / <alpha-value>)`,
      700: `rgb(var(--${globalPrefix}-color-yellow-700) / <alpha-value>)`,
      800: `rgb(var(--${globalPrefix}-color-yellow-800) / <alpha-value>)`,
      900: `rgb(var(--${globalPrefix}-color-yellow-900) / <alpha-value>)`,
    },
    lime: {
      50: `rgb(var(--${globalPrefix}-color-lime-50) / <alpha-value>)`,
      100: `rgb(var(--${globalPrefix}-color-lime-100) / <alpha-value>)`,
      200: `rgb(var(--${globalPrefix}-color-lime-200) / <alpha-value>)`,
      300: `rgb(var(--${globalPrefix}-color-lime-300) / <alpha-value>)`,
      400: `rgb(var(--${globalPrefix}-color-lime-400) / <alpha-value>)`,
      500: `rgb(var(--${globalPrefix}-color-lime-500) / <alpha-value>)`,
      600: `rgb(var(--${globalPrefix}-color-lime-600) / <alpha-value>)`,
      700: `rgb(var(--${globalPrefix}-color-lime-700) / <alpha-value>)`,
      800: `rgb(var(--${globalPrefix}-color-lime-800) / <alpha-value>)`,
      900: `rgb(var(--${globalPrefix}-color-lime-900) / <alpha-value>)`,
    },
    green: {
      50: `rgb(var(--${globalPrefix}-color-green-50) / <alpha-value>)`,
      100: `rgb(var(--${globalPrefix}-color-green-100) / <alpha-value>)`,
      200: `rgb(var(--${globalPrefix}-color-green-200) / <alpha-value>)`,
      300: `rgb(var(--${globalPrefix}-color-green-300) / <alpha-value>)`,
      400: `rgb(var(--${globalPrefix}-color-green-400) / <alpha-value>)`,
      500: `rgb(var(--${globalPrefix}-color-green-500) / <alpha-value>)`,
      600: `rgb(var(--${globalPrefix}-color-green-600) / <alpha-value>)`,
      700: `rgb(var(--${globalPrefix}-color-green-700) / <alpha-value>)`,
      800: `rgb(var(--${globalPrefix}-color-green-800) / <alpha-value>)`,
      900: `rgb(var(--${globalPrefix}-color-green-900) / <alpha-value>)`,
    },
    emerald: {
      50: `rgb(var(--${globalPrefix}-color-emerald-50) / <alpha-value>)`,
      100: `rgb(var(--${globalPrefix}-color-emerald-100) / <alpha-value>)`,
      200: `rgb(var(--${globalPrefix}-color-emerald-200) / <alpha-value>)`,
      300: `rgb(var(--${globalPrefix}-color-emerald-300) / <alpha-value>)`,
      400: `rgb(var(--${globalPrefix}-color-emerald-400) / <alpha-value>)`,
      500: `rgb(var(--${globalPrefix}-color-emerald-500) / <alpha-value>)`,
      600: `rgb(var(--${globalPrefix}-color-emerald-600) / <alpha-value>)`,
      700: `rgb(var(--${globalPrefix}-color-emerald-700) / <alpha-value>)`,
      800: `rgb(var(--${globalPrefix}-color-emerald-800) / <alpha-value>)`,
      900: `rgb(var(--${globalPrefix}-color-emerald-900) / <alpha-value>)`,
    },
    teal: {
      50: `rgb(var(--${globalPrefix}-color-teal-50) / <alpha-value>)`,
      100: `rgb(var(--${globalPrefix}-color-teal-100) / <alpha-value>)`,
      200: `rgb(var(--${globalPrefix}-color-teal-200) / <alpha-value>)`,
      300: `rgb(var(--${globalPrefix}-color-teal-300) / <alpha-value>)`,
      400: `rgb(var(--${globalPrefix}-color-teal-400) / <alpha-value>)`,
      500: `rgb(var(--${globalPrefix}-color-teal-500) / <alpha-value>)`,
      600: `rgb(var(--${globalPrefix}-color-teal-600) / <alpha-value>)`,
      700: `rgb(var(--${globalPrefix}-color-teal-700) / <alpha-value>)`,
      800: `rgb(var(--${globalPrefix}-color-teal-800) / <alpha-value>)`,
      900: `rgb(var(--${globalPrefix}-color-teal-900) / <alpha-value>)`,
    },
    cyan: {
      50: `rgb(var(--${globalPrefix}-color-cyan-50) / <alpha-value>)`,
      100: `rgb(var(--${globalPrefix}-color-cyan-100) / <alpha-value>)`,
      200: `rgb(var(--${globalPrefix}-color-cyan-200) / <alpha-value>)`,
      300: `rgb(var(--${globalPrefix}-color-cyan-300) / <alpha-value>)`,
      400: `rgb(var(--${globalPrefix}-color-cyan-400) / <alpha-value>)`,
      500: `rgb(var(--${globalPrefix}-color-cyan-500) / <alpha-value>)`,
      600: `rgb(var(--${globalPrefix}-color-cyan-600) / <alpha-value>)`,
      700: `rgb(var(--${globalPrefix}-color-cyan-700) / <alpha-value>)`,
      800: `rgb(var(--${globalPrefix}-color-cyan-800) / <alpha-value>)`,
      900: `rgb(var(--${globalPrefix}-color-cyan-900) / <alpha-value>)`,
    },
    sky: {
      50: `rgb(var(--${globalPrefix}-color-sky-50) / <alpha-value>)`,
      100: `rgb(var(--${globalPrefix}-color-sky-100) / <alpha-value>)`,
      200: `rgb(var(--${globalPrefix}-color-sky-200) / <alpha-value>)`,
      300: `rgb(var(--${globalPrefix}-color-sky-300) / <alpha-value>)`,
      400: `rgb(var(--${globalPrefix}-color-sky-400) / <alpha-value>)`,
      500: `rgb(var(--${globalPrefix}-color-sky-500) / <alpha-value>)`,
      600: `rgb(var(--${globalPrefix}-color-sky-600) / <alpha-value>)`,
      700: `rgb(var(--${globalPrefix}-color-sky-700) / <alpha-value>)`,
      800: `rgb(var(--${globalPrefix}-color-sky-800) / <alpha-value>)`,
      900: `rgb(var(--${globalPrefix}-color-sky-900) / <alpha-value>)`,
    },
    blue: {
      50: `rgb(var(--${globalPrefix}-color-blue-50) / <alpha-value>)`,
      100: `rgb(var(--${globalPrefix}-color-blue-100) / <alpha-value>)`,
      200: `rgb(var(--${globalPrefix}-color-blue-200) / <alpha-value>)`,
      300: `rgb(var(--${globalPrefix}-color-blue-300) / <alpha-value>)`,
      400: `rgb(var(--${globalPrefix}-color-blue-400) / <alpha-value>)`,
      500: `rgb(var(--${globalPrefix}-color-blue-500) / <alpha-value>)`,
      600: `rgb(var(--${globalPrefix}-color-blue-600) / <alpha-value>)`,
      700: `rgb(var(--${globalPrefix}-color-blue-700) / <alpha-value>)`,
      800: `rgb(var(--${globalPrefix}-color-blue-800) / <alpha-value>)`,
      900: `rgb(var(--${globalPrefix}-color-blue-900) / <alpha-value>)`,
    },
    indigo: {
      50: `rgb(var(--${globalPrefix}-color-indigo-50) / <alpha-value>)`,
      100: `rgb(var(--${globalPrefix}-color-indigo-100) / <alpha-value>)`,
      200: `rgb(var(--${globalPrefix}-color-indigo-200) / <alpha-value>)`,
      300: `rgb(var(--${globalPrefix}-color-indigo-300) / <alpha-value>)`,
      400: `rgb(var(--${globalPrefix}-color-indigo-400) / <alpha-value>)`,
      500: `rgb(var(--${globalPrefix}-color-indigo-500) / <alpha-value>)`,
      600: `rgb(var(--${globalPrefix}-color-indigo-600) / <alpha-value>)`,
      700: `rgb(var(--${globalPrefix}-color-indigo-700) / <alpha-value>)`,
      800: `rgb(var(--${globalPrefix}-color-indigo-800) / <alpha-value>)`,
      900: `rgb(var(--${globalPrefix}-color-indigo-900) / <alpha-value>)`,
    },
    violet: {
      50: `rgb(var(--${globalPrefix}-color-violet-50) / <alpha-value>)`,
      100: `rgb(var(--${globalPrefix}-color-violet-100) / <alpha-value>)`,
      200: `rgb(var(--${globalPrefix}-color-violet-200) / <alpha-value>)`,
      300: `rgb(var(--${globalPrefix}-color-violet-300) / <alpha-value>)`,
      400: `rgb(var(--${globalPrefix}-color-violet-400) / <alpha-value>)`,
      500: `rgb(var(--${globalPrefix}-color-violet-500) / <alpha-value>)`,
      600: `rgb(var(--${globalPrefix}-color-violet-600) / <alpha-value>)`,
      700: `rgb(var(--${globalPrefix}-color-violet-700) / <alpha-value>)`,
      800: `rgb(var(--${globalPrefix}-color-violet-800) / <alpha-value>)`,
      900: `rgb(var(--${globalPrefix}-color-violet-900) / <alpha-value>)`,
    },
    purple: {
      50: `rgb(var(--${globalPrefix}-color-purple-50) / <alpha-value>)`,
      100: `rgb(var(--${globalPrefix}-color-purple-100) / <alpha-value>)`,
      200: `rgb(var(--${globalPrefix}-color-purple-200) / <alpha-value>)`,
      300: `rgb(var(--${globalPrefix}-color-purple-300) / <alpha-value>)`,
      400: `rgb(var(--${globalPrefix}-color-purple-400) / <alpha-value>)`,
      500: `rgb(var(--${globalPrefix}-color-purple-500) / <alpha-value>)`,
      600: `rgb(var(--${globalPrefix}-color-purple-600) / <alpha-value>)`,
      700: `rgb(var(--${globalPrefix}-color-purple-700) / <alpha-value>)`,
      800: `rgb(var(--${globalPrefix}-color-purple-800) / <alpha-value>)`,
      900: `rgb(var(--${globalPrefix}-color-purple-900) / <alpha-value>)`,
    },
    fuchsia: {
      50: `rgb(var(--${globalPrefix}-color-fuchsia-50) / <alpha-value>)`,
      100: `rgb(var(--${globalPrefix}-color-fuchsia-100) / <alpha-value>)`,
      200: `rgb(var(--${globalPrefix}-color-fuchsia-200) / <alpha-value>)`,
      300: `rgb(var(--${globalPrefix}-color-fuchsia-300) / <alpha-value>)`,
      400: `rgb(var(--${globalPrefix}-color-fuchsia-400) / <alpha-value>)`,
      500: `rgb(var(--${globalPrefix}-color-fuchsia-500) / <alpha-value>)`,
      600: `rgb(var(--${globalPrefix}-color-fuchsia-600) / <alpha-value>)`,
      700: `rgb(var(--${globalPrefix}-color-fuchsia-700) / <alpha-value>)`,
      800: `rgb(var(--${globalPrefix}-color-fuchsia-800) / <alpha-value>)`,
      900: `rgb(var(--${globalPrefix}-color-fuchsia-900) / <alpha-value>)`,
    },
    pink: {
      50: `rgb(var(--${globalPrefix}-color-pink-50) / <alpha-value>)`,
      100: `rgb(var(--${globalPrefix}-color-pink-100) / <alpha-value>)`,
      200: `rgb(var(--${globalPrefix}-color-pink-200) / <alpha-value>)`,
      300: `rgb(var(--${globalPrefix}-color-pink-300) / <alpha-value>)`,
      400: `rgb(var(--${globalPrefix}-color-pink-400) / <alpha-value>)`,
      500: `rgb(var(--${globalPrefix}-color-pink-500) / <alpha-value>)`,
      600: `rgb(var(--${globalPrefix}-color-pink-600) / <alpha-value>)`,
      700: `rgb(var(--${globalPrefix}-color-pink-700) / <alpha-value>)`,
      800: `rgb(var(--${globalPrefix}-color-pink-800) / <alpha-value>)`,
      900: `rgb(var(--${globalPrefix}-color-pink-900) / <alpha-value>)`,
    },
    rose: {
      50: `rgb(var(--${globalPrefix}-color-rose-50) / <alpha-value>)`,
      100: `rgb(var(--${globalPrefix}-color-rose-100) / <alpha-value>)`,
      200: `rgb(var(--${globalPrefix}-color-rose-200) / <alpha-value>)`,
      300: `rgb(var(--${globalPrefix}-color-rose-300) / <alpha-value>)`,
      400: `rgb(var(--${globalPrefix}-color-rose-400) / <alpha-value>)`,
      500: `rgb(var(--${globalPrefix}-color-rose-500) / <alpha-value>)`,
      600: `rgb(var(--${globalPrefix}-color-rose-600) / <alpha-value>)`,
      700: `rgb(var(--${globalPrefix}-color-rose-700) / <alpha-value>)`,
      800: `rgb(var(--${globalPrefix}-color-rose-800) / <alpha-value>)`,
      900: `rgb(var(--${globalPrefix}-color-rose-900) / <alpha-value>)`,
    },
  }
}

function spacing(globalPrefix, theme) {
  const obj = {}
  Object.entries(theme.spacing).forEach(([key, value]) => {
    const cssVariable = `--${globalPrefix}-size-${key}`

    obj[key] = `var(${cssVariable.replace(".", "_")})`
  })
  return obj
}

function columns(globalPrefix, theme) {
  const obj = {}
  Object.entries(theme.columns).forEach(([key, value]) => {
    const cssVariable = `--${globalPrefix}-width-${key}`

    obj[key] = `var(${cssVariable})`
  })
  return obj
}

function maxWidth(globalPrefix, theme) {
  const obj = {}
  Object.entries(theme.maxWidth({ theme: (key) => theme[key], breakpoints })).forEach(
    ([key, value]) => {
      if (["0", "none", "full", "min", "max", "fit"].includes(key)) {
        obj[key] = value
      } else if (key.startsWith("screen")) {
        const cssVariable = `--${globalPrefix}-${key}`
        obj[key] = `var(${cssVariable})`
      } else {
        const cssVariable = `--${globalPrefix}-width-${key}`
        obj[key] = `var(${cssVariable})`
      }
    }
  )
  return obj
}

function fontFamily(globalPrefix, theme) {
  const obj = {}
  Object.entries(theme.fontFamily).forEach(([key, value]) => {
    const cssVariable = `--${globalPrefix}-font-family-${key}`

    obj[key] = `var(${cssVariable})`
  })
  return obj
}

function fontSize(globalPrefix, theme) {
  // This is a weird one, we'll need to hard-code it for now
  return {
    xs: [
      `var(--${globalPrefix}-font-size-xs)`,
      { lineHeight: `var(--${globalPrefix}-line-height-4)` },
    ],
    sm: [
      `var(--${globalPrefix}-font-size-sm)`,
      { lineHeight: `var(--${globalPrefix}-line-height-5)` },
    ],
    base: [
      `var(--${globalPrefix}-font-size-base)`,
      { lineHeight: `var(--${globalPrefix}-line-height-6)` },
    ],
    lg: [
      `var(--${globalPrefix}-font-size-lg)`,
      { lineHeight: `var(--${globalPrefix}-line-height-7)` },
    ],
    xl: [
      `var(--${globalPrefix}-font-size-xl)`,
      { lineHeight: `var(--${globalPrefix}-line-height-7)` },
    ],
    "2xl": [
      `var(--${globalPrefix}-font-size-2xl)`,
      { lineHeight: `var(--${globalPrefix}-line-height-8)` },
    ],
    "3xl": [
      `var(--${globalPrefix}-font-size-3xl)`,
      { lineHeight: `var(--${globalPrefix}-line-height-9)` },
    ],
    "4xl": [
      `var(--${globalPrefix}-font-size-4xl)`,
      { lineHeight: `var(--${globalPrefix}-line-height-10)` },
    ],
    "5xl": [
      `var(--${globalPrefix}-font-size-5xl)`,
      { lineHeight: `var(--${globalPrefix}-line-height-none)` },
    ],
    "6xl": [
      `var(--${globalPrefix}-font-size-6xl)`,
      { lineHeight: `var(--${globalPrefix}-line-height-none)` },
    ],
    "7xl": [
      `var(--${globalPrefix}-font-size-7xl)`,
      { lineHeight: `var(--${globalPrefix}-line-height-none)` },
    ],
    "8xl": [
      `var(--${globalPrefix}-font-size-8xl)`,
      { lineHeight: `var(--${globalPrefix}-line-height-none)` },
    ],
    "9xl": [
      `var(--${globalPrefix}-font-size-9xl)`,
      { lineHeight: `var(--${globalPrefix}-line-height-none)` },
    ],
  }
}

function fontWeight(globalPrefix, theme) {
  const obj = {}
  Object.entries(theme.fontWeight).forEach(([key, value]) => {
    const cssVariable = `--${globalPrefix}-font-weight-${key}`

    obj[key] = `var(${cssVariable})`
  })
  return obj
}

function borderRadius(globalPrefix, theme) {
  obj = {}
  Object.entries(theme.borderRadius).forEach(([key, value]) => {
    const cssVariable = `--${globalPrefix}-border-radius-${key.toLowerCase()}`

    obj[key] = `var(${cssVariable})`
  })
  return obj
}

function lineHeight(globalPrefix, theme) {
  const obj = {}
  Object.entries(theme.lineHeight).forEach(([key, value]) => {
    const cssVariable = `--${globalPrefix}-line-height-${key}`

    obj[key] = `var(${cssVariable})`
  })
  return obj
}

module.exports = {
  colors,
  spacing,
  columns,
  maxWidth,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  borderRadius,
}
