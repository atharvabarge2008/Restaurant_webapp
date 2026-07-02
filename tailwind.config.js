/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: { '2xl': '1400px' }
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
        secondary: { DEFAULT: 'hsl(var(--secondary))', foreground: 'hsl(var(--secondary-foreground))' },
        destructive: { DEFAULT: 'hsl(var(--destructive))', foreground: 'hsl(var(--destructive-foreground))' },
        muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
        accent: { DEFAULT: 'hsl(var(--accent))', foreground: 'hsl(var(--accent-foreground))' },
        popover: { DEFAULT: 'hsl(var(--popover))', foreground: 'hsl(var(--popover-foreground))' },
        card: { DEFAULT: 'hsl(var(--card))', foreground: 'hsl(var(--card-foreground))' },
        brand: {
          red: '#B71C1C',
          'red-dark': '#7f0f0f',
          'red-light': '#d63838',
          gold: '#FFD700',
          'gold-dark': '#c9a227',
          'gold-soft': '#f5d76e',
          ink: '#111111',
          'ink-soft': '#1a1a1a',
          cream: '#faf7f2'
        },
        chart: {
          '1': 'hsl(var(--chart-1))', '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))', '4': 'hsl(var(--chart-4))', '5': 'hsl(var(--chart-5))'
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        serif: ['var(--font-serif)', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        chinese: ['var(--font-chinese)', 'serif']
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
        'accordion-up': { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } },
        shimmer: { '0%': { backgroundPosition: '-1000px 0' }, '100%': { backgroundPosition: '1000px 0' } },
        'marquee': { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        'glow': { '0%,100%': { opacity: '0.6' }, '50%': { opacity: '1' } },
        'float': { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        shimmer: 'shimmer 2.5s linear infinite',
        marquee: 'marquee 40s linear infinite',
        glow: 'glow 3s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite'
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #FFD700 0%, #f5d76e 50%, #c9a227 100%)',
        'red-gradient': 'linear-gradient(135deg, #7f0f0f 0%, #B71C1C 50%, #d63838 100%)',
        'dark-radial': 'radial-gradient(ellipse at top, #1a0505 0%, #111111 60%, #000000 100%)'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
}
