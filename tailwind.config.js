import tailwindcssAnimate from 'tailwindcss-animate'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{ts,tsx,js,jsx}',
    'node_modules/preline/dist/*.js'
  ],
  theme: {
    extend: {
      colors: {
        bg_color_1: '#121722',
        primary_color: '#ff6504',
        secondary_color: '##EA5B00',
        bg_input: '#1f252e',
        border_input_color: '#464647',
        ph_color_1: '#595A5B',
        progress_bar: '#28282A',
        parr_color_1: '#BCBCBC',
        parr_color_2: '#E5E5E5',
        parr_color_3: '#888888',
        sb_text: '#fff',
        sb_bg: '#aaa',
        sb_hover: '#aaaa',
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
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))'
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
        '1-3': '32%',
        'logo-left': 'clamp(3%,4%,15%)',
        my_gap_1: '1rem',
        my_gap_2: '1.2rem',
        my_gap_3: '1.4rem'
      },
      screens: {
        'max-h-680': {
          raw: '(max-height: 680px)'
        },
        'max-h-600': {
          raw: '(max-height: 680px)'
        }
      },
      boxShadow: {
        'inner-custom': 'inset 0px 0px 25px rgba(0, 0, 0, 0.3)'
      },
      fontSize: {
        base_size: '14px',
        sz2: '16px',
        sz3: '18px',
        sz4: '20px'
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0'
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: '0'
          }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      },
      lineHeight: {
        lh1: '4px'
      }
    }
  },
  plugins: [
    tailwindcssAnimate,
    function ({ addUtilities }) {
      addUtilities({
        '.flex-complete': {
          display: 'flex',
          'justify-content': 'center',
          'align-items': 'center'
        }
      })
    },
    require('preline/plugin')
  ]
}
