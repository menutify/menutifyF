/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        // -------------MY VARS------------------
        /**
color UI #FF6504
blackground #191919
color campos #101010
border #232325
o inicio con google #595A5B
barra de progreso sin llenar #28282A
placeholder fields #595A5B
         */
        bg_color_1: '#191919',
        primary_color: '#FF6504',
        secondary_color: '##EA5B00',
        bg_input: '#101010',
        border_input_color: '#232325',
        ph_color_1: '#595A5B',
        progress_bar: '#28282A',

        parr_color_1: '#BCBCBC',
        parr_color_2: '#E5E5E5',
        parr_color_3: '#888888',

        // ---------------------------------------
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      fontFamily: {
        Helvetica: ['Helvetica Neue']
      },
      spacing: {
        '1-3': '32%'
      },
      screens: {
        // Define un breakpoint customizado para una altura de 680px
        'max-h-680': { 'raw': '(max-height: 680px)' },
      },
    }
  },
  plugins: [require('tailwindcss-animate')]
}
