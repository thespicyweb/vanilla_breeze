const plugin = require("tailwindcss/plugin")
const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  presets: [],
  darkMode: 'class', // or 'class'
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    referenceColors: ({ colors }) => ({
      inherit: colors.inherit,
      current: colors.current,
      transparent: colors.transparent,
      black: colors.black,
      white: colors.white,
      primary: {"50":"#eff6ff","100":"#dbeafe","200":"#bfdbfe","300":"#93c5fd","400":"#60a5fa","500":"#3b82f6","600":"#2563eb","700":"#1d4ed8","800":"#1e40af","900":"#1e3a8a"},
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
    }),
    colors: {
      inherit: 'var(--tw-color-inherit)',
      current: 'var(--tw-color-current)',
      transparent: 'var(--tw-color-transparent)',
      black: 'var(--tw-color-black)',
      white: 'var(--tw-color-white)',
      primary: {
        '50': 'var(--tw-color-primary-50)',
        '100': 'var(--tw-color-primary-100)',
        '200': 'var(--tw-color-primary-200)',
        '300': 'var(--tw-color-primary-300)',
        '400': 'var(--tw-color-primary-400)',
        '500': 'var(--tw-color-primary-500)',
        '600': 'var(--tw-color-primary-600)',
        '700': 'var(--tw-color-primary-700)',
        '800': 'var(--tw-color-primary-800)',
        '900': 'var(--tw-color-primary-900)'
      },
      slate: {
        '50': 'var(--tw-color-slate-50)',
        '100': 'var(--tw-color-slate-100)',
        '200': 'var(--tw-color-slate-200)',
        '300': 'var(--tw-color-slate-300)',
        '400': 'var(--tw-color-slate-400)',
        '500': 'var(--tw-color-slate-500)',
        '600': 'var(--tw-color-slate-600)',
        '700': 'var(--tw-color-slate-700)',
        '800': 'var(--tw-color-slate-800)',
        '900': 'var(--tw-color-slate-900)'
      },
      gray: {
        '50': 'var(--tw-color-gray-50)',
        '100': 'var(--tw-color-gray-100)',
        '200': 'var(--tw-color-gray-200)',
        '300': 'var(--tw-color-gray-300)',
        '400': 'var(--tw-color-gray-400)',
        '500': 'var(--tw-color-gray-500)',
        '600': 'var(--tw-color-gray-600)',
        '700': 'var(--tw-color-gray-700)',
        '800': 'var(--tw-color-gray-800)',
        '900': 'var(--tw-color-gray-900)'
      },
      zinc: {
        '50': 'var(--tw-color-zinc-50)',
        '100': 'var(--tw-color-zinc-100)',
        '200': 'var(--tw-color-zinc-200)',
        '300': 'var(--tw-color-zinc-300)',
        '400': 'var(--tw-color-zinc-400)',
        '500': 'var(--tw-color-zinc-500)',
        '600': 'var(--tw-color-zinc-600)',
        '700': 'var(--tw-color-zinc-700)',
        '800': 'var(--tw-color-zinc-800)',
        '900': 'var(--tw-color-zinc-900)'
      },
      neutral: {
        '50': 'var(--tw-color-neutral-50)',
        '100': 'var(--tw-color-neutral-100)',
        '200': 'var(--tw-color-neutral-200)',
        '300': 'var(--tw-color-neutral-300)',
        '400': 'var(--tw-color-neutral-400)',
        '500': 'var(--tw-color-neutral-500)',
        '600': 'var(--tw-color-neutral-600)',
        '700': 'var(--tw-color-neutral-700)',
        '800': 'var(--tw-color-neutral-800)',
        '900': 'var(--tw-color-neutral-900)'
      },
      stone: {
        '50': 'var(--tw-color-stone-50)',
        '100': 'var(--tw-color-stone-100)',
        '200': 'var(--tw-color-stone-200)',
        '300': 'var(--tw-color-stone-300)',
        '400': 'var(--tw-color-stone-400)',
        '500': 'var(--tw-color-stone-500)',
        '600': 'var(--tw-color-stone-600)',
        '700': 'var(--tw-color-stone-700)',
        '800': 'var(--tw-color-stone-800)',
        '900': 'var(--tw-color-stone-900)'
      },
      red: {
        '50': 'var(--tw-color-red-50)',
        '100': 'var(--tw-color-red-100)',
        '200': 'var(--tw-color-red-200)',
        '300': 'var(--tw-color-red-300)',
        '400': 'var(--tw-color-red-400)',
        '500': 'var(--tw-color-red-500)',
        '600': 'var(--tw-color-red-600)',
        '700': 'var(--tw-color-red-700)',
        '800': 'var(--tw-color-red-800)',
        '900': 'var(--tw-color-red-900)'
      },
      orange: {
        '50': 'var(--tw-color-orange-50)',
        '100': 'var(--tw-color-orange-100)',
        '200': 'var(--tw-color-orange-200)',
        '300': 'var(--tw-color-orange-300)',
        '400': 'var(--tw-color-orange-400)',
        '500': 'var(--tw-color-orange-500)',
        '600': 'var(--tw-color-orange-600)',
        '700': 'var(--tw-color-orange-700)',
        '800': 'var(--tw-color-orange-800)',
        '900': 'var(--tw-color-orange-900)'
      },
      amber: {
        '50': 'var(--tw-color-amber-50)',
        '100': 'var(--tw-color-amber-100)',
        '200': 'var(--tw-color-amber-200)',
        '300': 'var(--tw-color-amber-300)',
        '400': 'var(--tw-color-amber-400)',
        '500': 'var(--tw-color-amber-500)',
        '600': 'var(--tw-color-amber-600)',
        '700': 'var(--tw-color-amber-700)',
        '800': 'var(--tw-color-amber-800)',
        '900': 'var(--tw-color-amber-900)'
      },
      yellow: {
        '50': 'var(--tw-color-yellow-50)',
        '100': 'var(--tw-color-yellow-100)',
        '200': 'var(--tw-color-yellow-200)',
        '300': 'var(--tw-color-yellow-300)',
        '400': 'var(--tw-color-yellow-400)',
        '500': 'var(--tw-color-yellow-500)',
        '600': 'var(--tw-color-yellow-600)',
        '700': 'var(--tw-color-yellow-700)',
        '800': 'var(--tw-color-yellow-800)',
        '900': 'var(--tw-color-yellow-900)'
      },
      lime: {
        '50': 'var(--tw-color-lime-50)',
        '100': 'var(--tw-color-lime-100)',
        '200': 'var(--tw-color-lime-200)',
        '300': 'var(--tw-color-lime-300)',
        '400': 'var(--tw-color-lime-400)',
        '500': 'var(--tw-color-lime-500)',
        '600': 'var(--tw-color-lime-600)',
        '700': 'var(--tw-color-lime-700)',
        '800': 'var(--tw-color-lime-800)',
        '900': 'var(--tw-color-lime-900)'
      },
      green: {
        '50': 'var(--tw-color-green-50)',
        '100': 'var(--tw-color-green-100)',
        '200': 'var(--tw-color-green-200)',
        '300': 'var(--tw-color-green-300)',
        '400': 'var(--tw-color-green-400)',
        '500': 'var(--tw-color-green-500)',
        '600': 'var(--tw-color-green-600)',
        '700': 'var(--tw-color-green-700)',
        '800': 'var(--tw-color-green-800)',
        '900': 'var(--tw-color-green-900)'
      },
      emerald: {
        '50': 'var(--tw-color-emerald-50)',
        '100': 'var(--tw-color-emerald-100)',
        '200': 'var(--tw-color-emerald-200)',
        '300': 'var(--tw-color-emerald-300)',
        '400': 'var(--tw-color-emerald-400)',
        '500': 'var(--tw-color-emerald-500)',
        '600': 'var(--tw-color-emerald-600)',
        '700': 'var(--tw-color-emerald-700)',
        '800': 'var(--tw-color-emerald-800)',
        '900': 'var(--tw-color-emerald-900)'
      },
      teal: {
        '50': 'var(--tw-color-teal-50)',
        '100': 'var(--tw-color-teal-100)',
        '200': 'var(--tw-color-teal-200)',
        '300': 'var(--tw-color-teal-300)',
        '400': 'var(--tw-color-teal-400)',
        '500': 'var(--tw-color-teal-500)',
        '600': 'var(--tw-color-teal-600)',
        '700': 'var(--tw-color-teal-700)',
        '800': 'var(--tw-color-teal-800)',
        '900': 'var(--tw-color-teal-900)'
      },
      cyan: {
        '50': 'var(--tw-color-cyan-50)',
        '100': 'var(--tw-color-cyan-100)',
        '200': 'var(--tw-color-cyan-200)',
        '300': 'var(--tw-color-cyan-300)',
        '400': 'var(--tw-color-cyan-400)',
        '500': 'var(--tw-color-cyan-500)',
        '600': 'var(--tw-color-cyan-600)',
        '700': 'var(--tw-color-cyan-700)',
        '800': 'var(--tw-color-cyan-800)',
        '900': 'var(--tw-color-cyan-900)'
      },
      sky: {
        '50': 'var(--tw-color-sky-50)',
        '100': 'var(--tw-color-sky-100)',
        '200': 'var(--tw-color-sky-200)',
        '300': 'var(--tw-color-sky-300)',
        '400': 'var(--tw-color-sky-400)',
        '500': 'var(--tw-color-sky-500)',
        '600': 'var(--tw-color-sky-600)',
        '700': 'var(--tw-color-sky-700)',
        '800': 'var(--tw-color-sky-800)',
        '900': 'var(--tw-color-sky-900)'
      },
      blue: {
        '50': 'var(--tw-color-blue-50)',
        '100': 'var(--tw-color-blue-100)',
        '200': 'var(--tw-color-blue-200)',
        '300': 'var(--tw-color-blue-300)',
        '400': 'var(--tw-color-blue-400)',
        '500': 'var(--tw-color-blue-500)',
        '600': 'var(--tw-color-blue-600)',
        '700': 'var(--tw-color-blue-700)',
        '800': 'var(--tw-color-blue-800)',
        '900': 'var(--tw-color-blue-900)'
      },
      indigo: {
        '50': 'var(--tw-color-indigo-50)',
        '100': 'var(--tw-color-indigo-100)',
        '200': 'var(--tw-color-indigo-200)',
        '300': 'var(--tw-color-indigo-300)',
        '400': 'var(--tw-color-indigo-400)',
        '500': 'var(--tw-color-indigo-500)',
        '600': 'var(--tw-color-indigo-600)',
        '700': 'var(--tw-color-indigo-700)',
        '800': 'var(--tw-color-indigo-800)',
        '900': 'var(--tw-color-indigo-900)'
      },
      violet: {
        '50': 'var(--tw-color-violet-50)',
        '100': 'var(--tw-color-violet-100)',
        '200': 'var(--tw-color-violet-200)',
        '300': 'var(--tw-color-violet-300)',
        '400': 'var(--tw-color-violet-400)',
        '500': 'var(--tw-color-violet-500)',
        '600': 'var(--tw-color-violet-600)',
        '700': 'var(--tw-color-violet-700)',
        '800': 'var(--tw-color-violet-800)',
        '900': 'var(--tw-color-violet-900)'
      },
      purple: {
        '50': 'var(--tw-color-purple-50)',
        '100': 'var(--tw-color-purple-100)',
        '200': 'var(--tw-color-purple-200)',
        '300': 'var(--tw-color-purple-300)',
        '400': 'var(--tw-color-purple-400)',
        '500': 'var(--tw-color-purple-500)',
        '600': 'var(--tw-color-purple-600)',
        '700': 'var(--tw-color-purple-700)',
        '800': 'var(--tw-color-purple-800)',
        '900': 'var(--tw-color-purple-900)'
      },
      fuchsia: {
        '50': 'var(--tw-color-fuchsia-50)',
        '100': 'var(--tw-color-fuchsia-100)',
        '200': 'var(--tw-color-fuchsia-200)',
        '300': 'var(--tw-color-fuchsia-300)',
        '400': 'var(--tw-color-fuchsia-400)',
        '500': 'var(--tw-color-fuchsia-500)',
        '600': 'var(--tw-color-fuchsia-600)',
        '700': 'var(--tw-color-fuchsia-700)',
        '800': 'var(--tw-color-fuchsia-800)',
        '900': 'var(--tw-color-fuchsia-900)'
      },
      pink: {
        '50': 'var(--tw-color-pink-50)',
        '100': 'var(--tw-color-pink-100)',
        '200': 'var(--tw-color-pink-200)',
        '300': 'var(--tw-color-pink-300)',
        '400': 'var(--tw-color-pink-400)',
        '500': 'var(--tw-color-pink-500)',
        '600': 'var(--tw-color-pink-600)',
        '700': 'var(--tw-color-pink-700)',
        '800': 'var(--tw-color-pink-800)',
        '900': 'var(--tw-color-pink-900)'
      },
      rose: {
        '50': 'var(--tw-color-rose-50)',
        '100': 'var(--tw-color-rose-100)',
        '200': 'var(--tw-color-rose-200)',
        '300': 'var(--tw-color-rose-300)',
        '400': 'var(--tw-color-rose-400)',
        '500': 'var(--tw-color-rose-500)',
        '600': 'var(--tw-color-rose-600)',
        '700': 'var(--tw-color-rose-700)',
        '800': 'var(--tw-color-rose-800)',
        '900': 'var(--tw-color-rose-900)'
      }
    },
    columns: {
      '1': 'var(--tw-w-1)',
      '2': 'var(--tw-w-2)',
      '3': 'var(--tw-w-3)',
      '4': 'var(--tw-w-4)',
      '5': 'var(--tw-w-5)',
      '6': 'var(--tw-w-6)',
      '7': 'var(--tw-w-7)',
      '8': 'var(--tw-w-8)',
      '9': 'var(--tw-w-9)',
      '10': 'var(--tw-w-10)',
      '11': 'var(--tw-w-11)',
      '12': 'var(--tw-w-12)',
      auto: 'var(--tw-w-auto)',
      '3xs': 'var(--tw-w-3xs)',
      '2xs': 'var(--tw-w-2xs)',
      xs: 'var(--tw-w-xs)',
      sm: 'var(--tw-w-sm)',
      md: 'var(--tw-w-md)',
      lg: 'var(--tw-w-lg)',
      xl: 'var(--tw-w-xl)',
      '2xl': 'var(--tw-w-2xl)',
      '3xl': 'var(--tw-w-3xl)',
      '4xl': 'var(--tw-w-4xl)',
      '5xl': 'var(--tw-w-5xl)',
      '6xl': 'var(--tw-w-6xl)',
      '7xl': 'var(--tw-w-7xl)'
    },
    spacing: {
      '0': 'var(--tw-s-0)',
      '1': 'var(--tw-s-1)',
      '2': 'var(--tw-s-2)',
      '3': 'var(--tw-s-3)',
      '4': 'var(--tw-s-4)',
      '5': 'var(--tw-s-5)',
      '6': 'var(--tw-s-6)',
      '7': 'var(--tw-s-7)',
      '8': 'var(--tw-s-8)',
      '9': 'var(--tw-s-9)',
      '10': 'var(--tw-s-10)',
      '11': 'var(--tw-s-11)',
      '12': 'var(--tw-s-12)',
      '14': 'var(--tw-s-14)',
      '16': 'var(--tw-s-16)',
      '20': 'var(--tw-s-20)',
      '24': 'var(--tw-s-24)',
      '28': 'var(--tw-s-28)',
      '32': 'var(--tw-s-32)',
      '36': 'var(--tw-s-36)',
      '40': 'var(--tw-s-40)',
      '44': 'var(--tw-s-44)',
      '48': 'var(--tw-s-48)',
      '52': 'var(--tw-s-52)',
      '56': 'var(--tw-s-56)',
      '60': 'var(--tw-s-60)',
      '64': 'var(--tw-s-64)',
      '72': 'var(--tw-s-72)',
      '80': 'var(--tw-s-80)',
      '96': 'var(--tw-s-96)',
      px: 'var(--tw-s-px)',
      '0.5': 'var(--tw-s-0_5)',
      '1.5': 'var(--tw-s-1_5)',
      '2.5': 'var(--tw-s-2_5)',
      '3.5': 'var(--tw-s-3_5)'
    },
    animation: {
      none: 'none',
      spin: 'spin 1s linear infinite',
      ping: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
      pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      bounce: 'bounce 1s infinite',
    },
    aspectRatio: {
      auto: 'auto',
      square: '1 / 1',
      video: '16 / 9',
    },
    backdropBlur: ({ theme }) => theme('blur'),
    backdropBrightness: ({ theme }) => theme('brightness'),
    backdropContrast: ({ theme }) => theme('contrast'),
    backdropGrayscale: ({ theme }) => theme('grayscale'),
    backdropHueRotate: ({ theme }) => theme('hueRotate'),
    backdropInvert: ({ theme }) => theme('invert'),
    backdropOpacity: ({ theme }) => theme('opacity'),
    backdropSaturate: ({ theme }) => theme('saturate'),
    backdropSepia: ({ theme }) => theme('sepia'),
    backgroundColor: ({ theme }) => theme('colors'),
    backgroundImage: {
      none: 'none',
      'gradient-to-t': 'linear-gradient(to top, var(--tw-gradient-stops))',
      'gradient-to-tr': 'linear-gradient(to top right, var(--tw-gradient-stops))',
      'gradient-to-r': 'linear-gradient(to right, var(--tw-gradient-stops))',
      'gradient-to-br': 'linear-gradient(to bottom right, var(--tw-gradient-stops))',
      'gradient-to-b': 'linear-gradient(to bottom, var(--tw-gradient-stops))',
      'gradient-to-bl': 'linear-gradient(to bottom left, var(--tw-gradient-stops))',
      'gradient-to-l': 'linear-gradient(to left, var(--tw-gradient-stops))',
      'gradient-to-tl': 'linear-gradient(to top left, var(--tw-gradient-stops))',
    },
    backgroundOpacity: ({ theme }) => theme('opacity'),
    backgroundPosition: {
      bottom: 'bottom',
      center: 'center',
      left: 'left',
      'left-bottom': 'left bottom',
      'left-top': 'left top',
      right: 'right',
      'right-bottom': 'right bottom',
      'right-top': 'right top',
      top: 'top',
    },
    backgroundSize: {
      auto: 'auto',
      cover: 'cover',
      contain: 'contain',
    },
    blur: {
      0: '0',
      none: '0',
      sm: '4px',
      DEFAULT: '8px',
      md: '12px',
      lg: '16px',
      xl: '24px',
      '2xl': '40px',
      '3xl': '64px',
    },
    brightness: {
      0: '0',
      50: '.5',
      75: '.75',
      90: '.9',
      95: '.95',
      100: '1',
      105: '1.05',
      110: '1.1',
      125: '1.25',
      150: '1.5',
      200: '2',
    },
    borderColor: ({ theme }) => ({
      ...theme('colors'),
      DEFAULT: theme('colors.gray.200', 'currentColor'),
    }),
    borderOpacity: ({ theme }) => theme('opacity'),
    borderRadius: {
      none: 'var(--tw-border-radius-none)',
      sm: 'var(--tw-border-radius-sm)',
      DEFAULT: 'var(--tw-border-radius-default)',
      md: 'var(--tw-border-radius-md)',
      lg: 'var(--tw-border-radius-lg)',
      xl: 'var(--tw-border-radius-xl)',
      '2xl': 'var(--tw-border-radius-2xl)',
      '3xl': 'var(--tw-border-radius-3xl)',
      full: 'var(--tw-border-radius-full)'
    },
    borderSpacing: ({ theme }) => ({
      ...theme('spacing'),
    }),
    borderWidth: {
      DEFAULT: '1px',
      0: '0px',
      2: '2px',
      4: '4px',
      8: '8px',
    },
    boxShadow: {
      sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
      '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
      inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
      none: 'none',
    },
    boxShadowColor: ({ theme }) => theme('colors'),
    caretColor: ({ theme }) => theme('colors'),
    accentColor: ({ theme }) => ({
      ...theme('colors'),
      auto: 'auto',
    }),
    contrast: {
      0: '0',
      50: '.5',
      75: '.75',
      100: '1',
      125: '1.25',
      150: '1.5',
      200: '2',
    },
    container: {},
    content: {
      none: 'none',
    },
    cursor: {
      auto: 'auto',
      default: 'default',
      pointer: 'pointer',
      wait: 'wait',
      text: 'text',
      move: 'move',
      help: 'help',
      'not-allowed': 'not-allowed',
      none: 'none',
      'context-menu': 'context-menu',
      progress: 'progress',
      cell: 'cell',
      crosshair: 'crosshair',
      'vertical-text': 'vertical-text',
      alias: 'alias',
      copy: 'copy',
      'no-drop': 'no-drop',
      grab: 'grab',
      grabbing: 'grabbing',
      'all-scroll': 'all-scroll',
      'col-resize': 'col-resize',
      'row-resize': 'row-resize',
      'n-resize': 'n-resize',
      'e-resize': 'e-resize',
      's-resize': 's-resize',
      'w-resize': 'w-resize',
      'ne-resize': 'ne-resize',
      'nw-resize': 'nw-resize',
      'se-resize': 'se-resize',
      'sw-resize': 'sw-resize',
      'ew-resize': 'ew-resize',
      'ns-resize': 'ns-resize',
      'nesw-resize': 'nesw-resize',
      'nwse-resize': 'nwse-resize',
      'zoom-in': 'zoom-in',
      'zoom-out': 'zoom-out',
    },
    divideColor: ({ theme }) => theme('borderColor'),
    divideOpacity: ({ theme }) => theme('borderOpacity'),
    divideWidth: ({ theme }) => theme('borderWidth'),
    dropShadow: {
      sm: '0 1px 1px rgb(0 0 0 / 0.05)',
      DEFAULT: ['0 1px 2px rgb(0 0 0 / 0.1)', '0 1px 1px rgb(0 0 0 / 0.06)'],
      md: ['0 4px 3px rgb(0 0 0 / 0.07)', '0 2px 2px rgb(0 0 0 / 0.06)'],
      lg: ['0 10px 8px rgb(0 0 0 / 0.04)', '0 4px 3px rgb(0 0 0 / 0.1)'],
      xl: ['0 20px 13px rgb(0 0 0 / 0.03)', '0 8px 5px rgb(0 0 0 / 0.08)'],
      '2xl': '0 25px 25px rgb(0 0 0 / 0.15)',
      none: '0 0 #0000',
    },
    fill: ({ theme }) => theme('colors'),
    grayscale: {
      0: '0',
      DEFAULT: '100%',
    },
    hueRotate: {
      0: '0deg',
      15: '15deg',
      30: '30deg',
      60: '60deg',
      90: '90deg',
      180: '180deg',
    },
    invert: {
      0: '0',
      DEFAULT: '100%',
    },
    flex: {
      1: '1 1 0%',
      auto: '1 1 auto',
      initial: '0 1 auto',
      none: 'none',
    },
    flexBasis: ({ theme }) => ({
      auto: 'auto',
      ...theme('spacing'),
      '1/2': '50%',
      '1/3': '33.333333%',
      '2/3': '66.666667%',
      '1/4': '25%',
      '2/4': '50%',
      '3/4': '75%',
      '1/5': '20%',
      '2/5': '40%',
      '3/5': '60%',
      '4/5': '80%',
      '1/6': '16.666667%',
      '2/6': '33.333333%',
      '3/6': '50%',
      '4/6': '66.666667%',
      '5/6': '83.333333%',
      '1/12': '8.333333%',
      '2/12': '16.666667%',
      '3/12': '25%',
      '4/12': '33.333333%',
      '5/12': '41.666667%',
      '6/12': '50%',
      '7/12': '58.333333%',
      '8/12': '66.666667%',
      '9/12': '75%',
      '10/12': '83.333333%',
      '11/12': '91.666667%',
      full: '100%',
    }),
    flexGrow: {
      0: '0',
      DEFAULT: '1',
    },
    flexShrink: {
      0: '0',
      DEFAULT: '1',
    },
    fontFamily: {
      sans: 'var(--tw-font-family-sans)',
      serif: 'var(--tw-font-family-serif)',
      mono: 'var(--tw-font-family-mono)',
    },
    fontSize: {
      xs: ['var(--tw-font-size-xs)', { lineHeight: 'var(--tw-line-height-4)' }],
      sm: ['var(--tw-font-size-sm)', { lineHeight: 'var(--tw-line-height-5)' }],
      base: ['var(--tw-font-size-base)', { lineHeight: 'var(--tw-line-height-6)' }],
      lg: ['var(--tw-font-size-lg)', { lineHeight: 'var(--tw-line-height-7)' }],
      xl: ['var(--tw-font-size-xl)', { lineHeight: 'var(--tw-line-height-7)' }],
      '2xl': ['var(--tw-font-size-2xl)', { lineHeight: 'var(--tw-line-height-8)' }],
      '3xl': ['var(--tw-font-size-3xl)', { lineHeight: 'var(--tw-line-height-9)' }],
      '4xl': ['var(--tw-font-size-4xl)', { lineHeight: 'var(--tw-line-height-10)' }],
      '5xl': ['var(--tw-font-size-5xl)', { lineHeight: 'var(--tw-line-height-none)' }],
      '6xl': ['var(--tw-font-size-6xl)', { lineHeight: 'var(--tw-line-height-none)' }],
      '7xl': ['var(--tw-font-size-7xl)', { lineHeight: 'var(--tw-line-height-none)' }],
      '8xl': ['var(--tw-font-size-8xl)', { lineHeight: 'var(--tw-line-height-none)' }],
      '9xl': ['var(--tw-font-size-9xl)', { lineHeight: 'var(--tw-line-height-none)' }]
    },
    fontWeight: {
      thin: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
    },
    gap: ({ theme }) => theme('spacing'),
    gradientColorStops: ({ theme }) => theme('colors'),
    gridAutoColumns: {
      auto: 'auto',
      min: 'min-content',
      max: 'max-content',
      fr: 'minmax(0, 1fr)',
    },
    gridAutoRows: {
      auto: 'auto',
      min: 'min-content',
      max: 'max-content',
      fr: 'minmax(0, 1fr)',
    },
    gridColumn: {
      auto: 'auto',
      'span-1': 'span 1 / span 1',
      'span-2': 'span 2 / span 2',
      'span-3': 'span 3 / span 3',
      'span-4': 'span 4 / span 4',
      'span-5': 'span 5 / span 5',
      'span-6': 'span 6 / span 6',
      'span-7': 'span 7 / span 7',
      'span-8': 'span 8 / span 8',
      'span-9': 'span 9 / span 9',
      'span-10': 'span 10 / span 10',
      'span-11': 'span 11 / span 11',
      'span-12': 'span 12 / span 12',
      'span-full': '1 / -1',
    },
    gridColumnEnd: {
      auto: 'auto',
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      6: '6',
      7: '7',
      8: '8',
      9: '9',
      10: '10',
      11: '11',
      12: '12',
      13: '13',
    },
    gridColumnStart: {
      auto: 'auto',
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      6: '6',
      7: '7',
      8: '8',
      9: '9',
      10: '10',
      11: '11',
      12: '12',
      13: '13',
    },
    gridRow: {
      auto: 'auto',
      'span-1': 'span 1 / span 1',
      'span-2': 'span 2 / span 2',
      'span-3': 'span 3 / span 3',
      'span-4': 'span 4 / span 4',
      'span-5': 'span 5 / span 5',
      'span-6': 'span 6 / span 6',
      'span-full': '1 / -1',
    },
    gridRowStart: {
      auto: 'auto',
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      6: '6',
      7: '7',
    },
    gridRowEnd: {
      auto: 'auto',
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      6: '6',
      7: '7',
    },
    gridTemplateColumns: {
      none: 'none',
      1: 'repeat(1, minmax(0, 1fr))',
      2: 'repeat(2, minmax(0, 1fr))',
      3: 'repeat(3, minmax(0, 1fr))',
      4: 'repeat(4, minmax(0, 1fr))',
      5: 'repeat(5, minmax(0, 1fr))',
      6: 'repeat(6, minmax(0, 1fr))',
      7: 'repeat(7, minmax(0, 1fr))',
      8: 'repeat(8, minmax(0, 1fr))',
      9: 'repeat(9, minmax(0, 1fr))',
      10: 'repeat(10, minmax(0, 1fr))',
      11: 'repeat(11, minmax(0, 1fr))',
      12: 'repeat(12, minmax(0, 1fr))',
    },
    gridTemplateRows: {
      none: 'none',
      1: 'repeat(1, minmax(0, 1fr))',
      2: 'repeat(2, minmax(0, 1fr))',
      3: 'repeat(3, minmax(0, 1fr))',
      4: 'repeat(4, minmax(0, 1fr))',
      5: 'repeat(5, minmax(0, 1fr))',
      6: 'repeat(6, minmax(0, 1fr))',
    },
    height: ({ theme }) => ({
      auto: 'auto',
      ...theme('spacing'),
      '1/2': '50%',
      '1/3': '33.333333%',
      '2/3': '66.666667%',
      '1/4': '25%',
      '2/4': '50%',
      '3/4': '75%',
      '1/5': '20%',
      '2/5': '40%',
      '3/5': '60%',
      '4/5': '80%',
      '1/6': '16.666667%',
      '2/6': '33.333333%',
      '3/6': '50%',
      '4/6': '66.666667%',
      '5/6': '83.333333%',
      full: '100%',
      screen: '100vh',
      min: 'min-content',
      max: 'max-content',
      fit: 'fit-content',
    }),
    inset: ({ theme }) => ({
      auto: 'auto',
      ...theme('spacing'),
      '1/2': '50%',
      '1/3': '33.333333%',
      '2/3': '66.666667%',
      '1/4': '25%',
      '2/4': '50%',
      '3/4': '75%',
      full: '100%',
    }),
    keyframes: {
      spin: {
        to: {
          transform: 'rotate(360deg)',
        },
      },
      ping: {
        '75%, 100%': {
          transform: 'scale(2)',
          opacity: '0',
        },
      },
      pulse: {
        '50%': {
          opacity: '.5',
        },
      },
      bounce: {
        '0%, 100%': {
          transform: 'translateY(-25%)',
          animationTimingFunction: 'cubic-bezier(0.8,0,1,1)',
        },
        '50%': {
          transform: 'none',
          animationTimingFunction: 'cubic-bezier(0,0,0.2,1)',
        },
      },
    },
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0em',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },
    lineHeight: {
      '3': 'var(--tw-line-height-3)',
      '4': 'var(--tw-line-height-4)',
      '5': 'var(--tw-line-height-5)',
      '6': 'var(--tw-line-height-6)',
      '7': 'var(--tw-line-height-7)',
      '8': 'var(--tw-line-height-8)',
      '9': 'var(--tw-line-height-9)',
      '10': 'var(--tw-line-height-10)',
      none: 'var(--tw-line-height-none)',
      tight: 'var(--tw-line-height-tight)',
      snug: 'var(--tw-line-height-snug)',
      normal: 'var(--tw-line-height-normal)',
      relaxed: 'var(--tw-line-height-relaxed)',
      loose: 'var(--tw-line-height-loose)'
    },
    listStyleType: {
      none: 'none',
      disc: 'disc',
      decimal: 'decimal',
    },
    margin: ({ theme }) => ({
      auto: 'auto',
      ...theme('spacing'),
    }),
    maxHeight: ({ theme }) => ({
      ...theme('spacing'),
      full: '100%',
      screen: '100vh',
      min: 'min-content',
      max: 'max-content',
      fit: 'fit-content',
    }),
    maxWidth: ({ theme, breakpoints }) => ({
      none: 'none',
      0: '0rem',
      xs: 'var(--tw-w-xs)',
      sm: 'var(--tw-w-sm)',
      md: 'var(--tw-w-md)',
      lg: 'var(--tw-w-lg)',
      xl: 'var(--tw-w-xl)',
      '2xl': 'var(--tw-w-2xl)',
      '3xl': 'var(--tw-w-3xl)',
      '4xl': 'var(--tw-w-4xl)',
      '5xl': 'var(--tw-w-5xl)',
      '6xl': 'var(--tw-w-6xl)',
      '7xl': 'var(--tw-w-7xl)',
      full: '100%',
      min: 'min-content',
      max: 'max-content',
      fit: 'fit-content',
      prose: 'var(--tw-w-prose)',
      ...breakpoints(theme('screens')),
    }),
    minHeight: {
      0: '0px',
      full: '100%',
      screen: '100vh',
      min: 'min-content',
      max: 'max-content',
      fit: 'fit-content',
    },
    minWidth: {
      0: '0px',
      full: '100%',
      min: 'min-content',
      max: 'max-content',
      fit: 'fit-content',
    },
    objectPosition: {
      bottom: 'bottom',
      center: 'center',
      left: 'left',
      'left-bottom': 'left bottom',
      'left-top': 'left top',
      right: 'right',
      'right-bottom': 'right bottom',
      'right-top': 'right top',
      top: 'top',
    },
    opacity: {
      0: '0',
      5: '0.05',
      10: '0.1',
      20: '0.2',
      25: '0.25',
      30: '0.3',
      40: '0.4',
      50: '0.5',
      60: '0.6',
      70: '0.7',
      75: '0.75',
      80: '0.8',
      90: '0.9',
      95: '0.95',
      100: '1',
    },
    order: {
      first: '-9999',
      last: '9999',
      none: '0',
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      6: '6',
      7: '7',
      8: '8',
      9: '9',
      10: '10',
      11: '11',
      12: '12',
    },
    padding: ({ theme }) => theme('spacing'),
    placeholderColor: ({ theme }) => theme('colors'),
    placeholderOpacity: ({ theme }) => theme('opacity'),
    outlineColor: ({ theme }) => theme('colors'),
    outlineOffset: {
      0: '0px',
      1: '1px',
      2: '2px',
      4: '4px',
      8: '8px',
    },
    outlineWidth: {
      0: '0px',
      1: '1px',
      2: '2px',
      4: '4px',
      8: '8px',
    },
    ringColor: ({ theme }) => ({
      DEFAULT: theme(`colors.blue.500`, '#3b82f6'),
      ...theme('colors'),
    }),
    ringOffsetColor: ({ theme }) => theme('colors'),
    ringOffsetWidth: {
      0: '0px',
      1: '1px',
      2: '2px',
      4: '4px',
      8: '8px',
    },
    ringOpacity: ({ theme }) => ({
      DEFAULT: '0.5',
      ...theme('opacity'),
    }),
    ringWidth: {
      DEFAULT: '3px',
      0: '0px',
      1: '1px',
      2: '2px',
      4: '4px',
      8: '8px',
    },
    rotate: {
      0: '0deg',
      1: '1deg',
      2: '2deg',
      3: '3deg',
      6: '6deg',
      12: '12deg',
      45: '45deg',
      90: '90deg',
      180: '180deg',
    },
    saturate: {
      0: '0',
      50: '.5',
      100: '1',
      150: '1.5',
      200: '2',
    },
    scale: {
      0: '0',
      50: '.5',
      75: '.75',
      90: '.9',
      95: '.95',
      100: '1',
      105: '1.05',
      110: '1.1',
      125: '1.25',
      150: '1.5',
    },
    scrollMargin: ({ theme }) => ({
      ...theme('spacing'),
    }),
    scrollPadding: ({ theme }) => theme('spacing'),
    sepia: {
      0: '0',
      DEFAULT: '100%',
    },
    skew: {
      0: '0deg',
      1: '1deg',
      2: '2deg',
      3: '3deg',
      6: '6deg',
      12: '12deg',
    },
    space: ({ theme }) => ({
      ...theme('spacing'),
    }),
    stroke: ({ theme }) => theme('colors'),
    strokeWidth: {
      0: '0',
      1: '1',
      2: '2',
    },
    textColor: ({ theme }) => theme('colors'),
    textDecorationColor: ({ theme }) => theme('colors'),
    textDecorationThickness: {
      auto: 'auto',
      'from-font': 'from-font',
      0: '0px',
      1: '1px',
      2: '2px',
      4: '4px',
      8: '8px',
    },
    textUnderlineOffset: {
      auto: 'auto',
      0: '0px',
      1: '1px',
      2: '2px',
      4: '4px',
      8: '8px',
    },
    textIndent: ({ theme }) => ({
      ...theme('spacing'),
    }),
    textOpacity: ({ theme }) => theme('opacity'),
    transformOrigin: {
      center: 'center',
      top: 'top',
      'top-right': 'top right',
      right: 'right',
      'bottom-right': 'bottom right',
      bottom: 'bottom',
      'bottom-left': 'bottom left',
      left: 'left',
      'top-left': 'top left',
    },
    transitionDelay: {
      75: '75ms',
      100: '100ms',
      150: '150ms',
      200: '200ms',
      300: '300ms',
      500: '500ms',
      700: '700ms',
      1000: '1000ms',
    },
    transitionDuration: {
      DEFAULT: '150ms',
      75: '75ms',
      100: '100ms',
      150: '150ms',
      200: '200ms',
      300: '300ms',
      500: '500ms',
      700: '700ms',
      1000: '1000ms',
    },
    transitionProperty: {
      none: 'none',
      all: 'all',
      DEFAULT:
        'color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter',
      colors: 'color, background-color, border-color, text-decoration-color, fill, stroke',
      opacity: 'opacity',
      shadow: 'box-shadow',
      transform: 'transform',
    },
    transitionTimingFunction: {
      DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
      linear: 'linear',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
    translate: ({ theme }) => ({
      ...theme('spacing'),
      '1/2': '50%',
      '1/3': '33.333333%',
      '2/3': '66.666667%',
      '1/4': '25%',
      '2/4': '50%',
      '3/4': '75%',
      full: '100%',
    }),
    width: ({ theme }) => ({
      auto: 'auto',
      ...theme('spacing'),
      '1/2': '50%',
      '1/3': '33.333333%',
      '2/3': '66.666667%',
      '1/4': '25%',
      '2/4': '50%',
      '3/4': '75%',
      '1/5': '20%',
      '2/5': '40%',
      '3/5': '60%',
      '4/5': '80%',
      '1/6': '16.666667%',
      '2/6': '33.333333%',
      '3/6': '50%',
      '4/6': '66.666667%',
      '5/6': '83.333333%',
      '1/12': '8.333333%',
      '2/12': '16.666667%',
      '3/12': '25%',
      '4/12': '33.333333%',
      '5/12': '41.666667%',
      '6/12': '50%',
      '7/12': '58.333333%',
      '8/12': '66.666667%',
      '9/12': '75%',
      '10/12': '83.333333%',
      '11/12': '91.666667%',
      full: '100%',
      screen: '100vw',
      min: 'min-content',
      max: 'max-content',
      fit: 'fit-content',
    }),
    willChange: {
      auto: 'auto',
      scroll: 'scroll-position',
      contents: 'contents',
      transform: 'transform',
    },
    zIndex: {
      auto: 'auto',
      0: '0',
      10: '10',
      20: '20',
      30: '30',
      40: '40',
      50: '50',
    },
  },
  variantOrder: [
    'first',
    'last',
    'odd',
    'even',
    'visited',
    'checked',
    'empty',
    'read-only',
    'group-hover',
    'group-focus',
    'focus-within',
    'hover',
    'focus',
    'focus-visible',
    'active',
    'disabled',
  ],
  plugins: [
    plugin(function ({ addBase, theme }) {
      function extractColorVars (colorObj, colorGroup = '') {
        return Object.keys(colorObj).reduce((vars, colorKey) => {
          const value = colorObj[colorKey];
          const cssVariable = colorKey === "DEFAULT" ? `--tw-color${colorGroup}` : `--tw-color${colorGroup}-${colorKey}`;

          const newVars =
            typeof value === 'string'
              ? { [cssVariable]: value }
              : extractColorVars(value, `-${colorKey}`);

          return { ...vars, ...newVars };
        }, {});
      }

      function extractVars (prefix, colorObj, colorGroup = '') {
        return Object.keys(colorObj).reduce((vars, colorKey) => {
          const value = colorObj[colorKey];
          const cssVariable = `--tw-${prefix}${colorKey.toLowerCase().replace('.','_')}`;

          const newVars =
            typeof value === 'string'
              ? { [cssVariable]: value }
              : extractVars(prefix, value, `-${colorKey}`);

          return { ...vars, ...newVars };
        }, {});
      }

      function extractFontVars (prefix, colorObj, colorGroup = '') {
        return Object.keys(colorObj).reduce((vars, colorKey) => {
          const value = colorObj[colorKey];
          const cssVariable = `--tw-${prefix}${colorKey.replace('.','_')}`;

          const newVars = { [cssVariable]: value[0] }

          return { ...vars, ...newVars };
        }, {});
      }

      function extractFamilyVars (prefix, colorObj, colorGroup = '') {
        return Object.keys(colorObj).reduce((vars, colorKey) => {
          const value = colorObj[colorKey].join(", ");
          const cssVariable = `--tw-${prefix}${colorKey.replace('.','_')}`;

          const newVars = { [cssVariable]: value }

          return { ...vars, ...newVars };
        }, {});
      }

      addBase({
        ':root': extractColorVars(theme('referenceColors')),
      });

      addBase({
        ':root': extractVars("s-", defaultTheme.spacing),
      });

      addBase({
        ':root': extractVars("w-", defaultTheme.columns),
      });

      addBase({
        ':root': {
          '--tw-w-prose': defaultTheme.maxWidth({theme, breakpoints: () => {}}).prose
        },
      });

      addBase({
        ':root': extractFamilyVars("font-family-", defaultTheme.fontFamily),
      });

      addBase({
        ':root': extractFontVars("font-size-", defaultTheme.fontSize),
      });

      addBase({
        ':root': extractVars("line-height-", defaultTheme.lineHeight),
      });

      addBase({
        ':root': extractVars("border-radius-", defaultTheme.borderRadius),
      });

//       function variableizeColors(colorObj, colorGroup = '') {
//         Object.entries(colorObj).forEach(([key, value]) => {
//           if (typeof value === "object") {
//             variableizeColors(colorObj[key], `-${key}`)
//           } else {
//             const cssVariable = colorGroup === '' ? `--tw-color-${key}` : `--tw-color${colorGroup}-${key}`;

//             colorObj[key] = `var(${cssVariable})`
//           }
//         })
//       }
//       variableizeColors(theme('colors'))
//       console.info(theme('colors'))

      // function variableizeSpaces(spaceObj) {
      //   Object.entries(spaceObj).forEach(([key, value]) => {
      //     const cssVariable = `--tw-s${key}`;

      //     spaceObj[key] = `var(${cssVariable})`
      //   })
      // }
      // variableizeSpaces(theme('spacing'))
      // console.info(theme('spacing'))

      // function variableizeSpaces(spaceObj) {
      //   Object.entries(spaceObj).forEach(([key, value]) => {
      //     const cssVariable = `--tw-s${key}`;

      //     spaceObj[key] = `var(${cssVariable})`
      //   })
      // }
      // variableizeSpaces(theme('spacing'))
      // console.info(theme('spacing'))

      // function variableizeColumns(obj) {
      //   Object.entries(obj).forEach(([key, value]) => {
      //     const cssVariable = `--tw-w-${key}`;

      //     obj[key] = `var(${cssVariable})`
      //   })
      // }
      // variableizeColumns(theme('columns'))
      // console.info(theme('columns'))

      // function variableizeFontSize(obj) {
      //   Object.entries(obj).forEach(([key, value]) => {
      //     const cssVariable = `--tw-font-size-${key}`;

      //     obj[key] = `var(${cssVariable})`
      //   })
      // }
      // variableizeFontSize(theme('fontSize'))
      // console.info(theme('fontSize'))

      // function variableizeLineHeight(obj) {
      //   Object.entries(obj).forEach(([key, value]) => {
      //     const cssVariable = `--tw-line-height-${key}`;

      //     obj[key] = `var(${cssVariable})`
      //   })
      // }
      // variableizeLineHeight(theme('lineHeight'))
      // console.info(theme('lineHeight'))

      // function variableizeBorderRadius(obj) {
      //   Object.entries(obj).forEach(([key, value]) => {
      //     const cssVariable = `--tw-border-radius-${key.toLowerCase()}`;

      //     obj[key] = `var(${cssVariable})`
      //   })
      // }
      // variableizeBorderRadius(theme('borderRadius'))
      // console.info(theme('borderRadius'))
    })
  ],
}
