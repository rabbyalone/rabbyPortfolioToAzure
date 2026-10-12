/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    screens: {
      'sm': '640px',
      'tablet': '810px',
      'md': '810px',
      'lg': '1024px',
      'desktop': '1200px',
      'xl': '1200px',
      '2xl': '1440px',
    },
    extend: {
      colors: {
        velora: {
          // Official 17 color tokens (Section 01)
          'main-01': 'var(--velora-main-01)',
          'main-02': 'var(--velora-main-02)',
          'bg': 'var(--velora-bg)',
          'overlay': 'var(--velora-overlay)',
          'neutral-00': 'var(--velora-neutral-00)',
          'neutral-01': 'var(--velora-neutral-01)',
          'neutral-02': 'var(--velora-neutral-02)',
          'neutral-03': 'var(--velora-neutral-03)',
          'neutral-04': 'var(--velora-neutral-04)',
          'neutral-05': 'var(--velora-neutral-05)',
          'neutral-06': 'var(--velora-neutral-06)',
          'neutral-07': 'var(--velora-neutral-07)',
          'neutral-08': 'var(--velora-neutral-08)',
          'neutral-09': 'var(--velora-neutral-09)',
          'neutral-10': 'var(--velora-neutral-10)',
          'neutral-11': 'var(--velora-neutral-11)',
          'neutral-12': 'var(--velora-neutral-12)',

          // Semantic aliases
          card: 'var(--velora-neutral-00)',
          fill: 'var(--velora-neutral-02)',
          divider: 'var(--velora-neutral-03)',
          border: 'var(--velora-neutral-04)',
          disabled: 'var(--velora-neutral-05)',
          muted: 'var(--velora-neutral-06)',
          placeholder: 'var(--velora-neutral-07)',
          metadata: 'var(--velora-neutral-08)',
          label: 'var(--velora-neutral-09)',
          secondary: 'var(--velora-neutral-10)',
          nearblack: 'var(--velora-neutral-11)',
          primary: 'var(--velora-neutral-12)',
          sand1: 'var(--velora-main-01)',
          sand2: 'var(--velora-main-02)',
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['Inter', '-apple-system', 'sans-serif'],
        mono: ['"Fragment Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        'velora': '1400px',
      },
      letterSpacing: {
        'tightest': '-0.06em',
        'tighter': '-0.05em',
        'tight': '-0.04em',
        'label': '-0.03em',
      },
      borderRadius: {
        'chip': '2px',       // Section 03: Label chips
        'velora': '4px',     // Section 03: Images, media wrappers, cards, panels (default)
        'card': '6px',       // Section 03: Work card surface
        'lg-velora': '8px',  // Section 03: Work detail gallery wrappers
        'pill': '100px',     // Section 03: Testimonial avatar and custom cursor
      }
    },
  },
  plugins: [],
}
