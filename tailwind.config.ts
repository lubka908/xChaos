import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'chaos-dark': '#0a0e27',
        'chaos-darker': '#050814',
        'chaos-blue': '#00d4ff',
        'chaos-purple': '#b794f6',
        'chaos-pink': '#ff006e',
        'chaos-orange': '#ff8c42',
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'particle': 'particle-float 20s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'particle-float': {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '25%': { transform: 'translate(10px, -10px) rotate(90deg)' },
          '50%': { transform: 'translate(-5px, -20px) rotate(180deg)' },
          '75%': { transform: 'translate(-15px, -10px) rotate(270deg)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
