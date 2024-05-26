import type { Config } from 'tailwindcss'
import { neutral } from 'tailwindcss/colors'

const config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        gray: neutral,
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
} satisfies Config

export default config
