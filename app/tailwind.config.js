/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: 'var(--primary)',
        'primary-foreground': 'var(--primary-foreground)',
        muted: 'var(--muted)',
        'muted-foreground': 'var(--muted-foreground)',
        border: 'var(--border)',
        ring: 'var(--ring)',
        card: 'var(--card)',
        'card-foreground': 'var(--card-foreground)',
        destructive: 'var(--destructive)',
        'destructive-foreground': 'var(--destructive-foreground)',
        sidebar: 'var(--sidebar)',
        text: {
          foreground: '#2f414a',
        },
      },
      spacing: {
        15: '3.75rem',
      },
      fontSize: {
        'heading-4': [
          '1.25rem',
          { lineHeight: '1.42857', fontWeight: '600' },
        ],
      },
    },
  },
  plugins: [],
}
