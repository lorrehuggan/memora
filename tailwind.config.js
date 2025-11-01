/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{jsx,tsx}",
    "./lib/**/*.{jsx,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
              // Semantic tokens (driven by CSS vars)
              bg: {
                DEFAULT: 'rgb(var(--bg) / <alpha-value>)',
                elevated: 'rgb(var(--bg-elevated) / <alpha-value>)',
              },
              text: {
                primary: 'rgb(var(--text-primary) / <alpha-value>)',
                secondary: 'rgb(var(--text-secondary) / <alpha-value>)',
                inverse: 'rgb(var(--text-inverse) / <alpha-value>)',
              },
              brand: {
                DEFAULT: 'rgb(var(--brand) / <alpha-value>)',
                weak: 'rgb(var(--brand-weak) / <alpha-value>)',
                ring: 'rgb(var(--brand-ring) / <alpha-value>)',
              },
              accent: {
                affirm: 'rgb(var(--accent-affirm) / <alpha-value>)',
                attention: 'rgb(var(--accent-attention) / <alpha-value>)',
              },
              border: {
                subtle: 'rgb(var(--border-subtle) / <alpha-value>)',
              },
              muted: 'rgb(var(--muted) / <alpha-value>)',
              card: 'rgb(var(--card) / <alpha-value>)',
              ring: 'rgb(var(--ring) / <alpha-value>)',
              destructive: 'rgb(var(--destructive) / <alpha-value>)',
            },

            fontFamily: {
              sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
              mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
            },

            fontSize: {
              display: ['32px', { lineHeight: '38px', fontWeight: '600' }],
              title: ['24px', { lineHeight: '30px', fontWeight: '600' }],
              body: ['16px', { lineHeight: '24px', fontWeight: '400' }],
              caption: ['13px', { lineHeight: '18px', fontWeight: '400' }],
            },

            spacing: {
              // 8pt-friendly additions (Tailwind already covers most)
              4.5: '1.125rem',  // 18px
            },

            borderRadius: {
              sm: '8px',
              md: '16px',
              lg: '24px',
              xl: '28px',
              '2xl': '32px',
            },

            boxShadow: {
              soft: '0 8px 24px -12px rgb(0 0 0 / 0.18)',
              'soft-lg': '0 16px 40px -18px rgb(0 0 0 / 0.22)',
            },

            backdropBlur: {
              xs: '2px',
            },

            keyframes: {
              'pulse-ring': {
                '0%': { transform: 'scale(1)', opacity: '0.6' },
                '70%': { transform: 'scale(1.15)', opacity: '0.12' },
                '100%': { transform: 'scale(1.2)', opacity: '0' },
              },
              fade: {
                '0%': { opacity: '0' },
                '100%': { opacity: '1' },
              },
              rise: {
                '0%': { opacity: '0', transform: 'translateY(6px)' },
                '100%': { opacity: '1', transform: 'translateY(0)' },
              },
            },

            animation: {
              'pulse-ring': 'pulse-ring 1.2s ease-out infinite',
              fade: 'fade .25s ease-out both',
              rise: 'rise .25s ease-out both',
            },

            ringColor: {
              DEFAULT: 'rgb(var(--ring) / <alpha-value>)',
            },

            // Useful semantic shadows/rings
            ringOffsetColor: {
              brand: 'rgb(var(--brand-weak) / <alpha-value>)',
            },
          },
  },
  plugins: [],
};
