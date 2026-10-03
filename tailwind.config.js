/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0A0E14',
        elevated: '#12171F',
        elevated2: '#1A212C',
        surface: '#232B38',
        accent: '#4FD1C5',
        accent2: '#F5A623',
        'java-red': '#EA2D2E',
        'react-blue': '#61DAFB',
        'angular-red': '#DD0031',
        'spring-green': '#77bc1f',
        'ts-blue': '#3178C6',
        'mysql-blue': '#4aa3d8',
      },
      fontFamily: {
        display: ['"IBM Plex Serif"', 'serif'],
        body: ['"IBM Plex Sans"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      keyframes: {
        blink: { '50%': { opacity: 0 } },
        pulse2: { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.3 } },
        drift: {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '33%': { transform: 'translate(-30px,40px) scale(1.1)' },
          '66%': { transform: 'translate(30px,-20px) scale(0.95)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        'gradient-shift': {
          '0%,100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        aurora: {
          '0%,100%': { transform: 'translate(0,0) scale(1) rotate(0deg)' },
          '33%': { transform: 'translate(6%,-8%) scale(1.15) rotate(8deg)' },
          '66%': { transform: 'translate(-6%,6%) scale(0.92) rotate(-6deg)' },
        },
        orbit: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'slide-up': {
          from: { opacity: 0, transform: 'translateY(20px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        'scale-in': {
          from: { opacity: 0, transform: 'scale(0.95)' },
          to: { opacity: 1, transform: 'scale(1)' },
        },
      },
      animation: {
        blink: 'blink 1s step-end infinite',
        pulse2: 'pulse2 1.8s ease-in-out infinite',
        drift: 'drift 18s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 5s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 6s ease infinite',
        marquee: 'marquee 38s linear infinite',
        aurora: 'aurora 22s ease-in-out infinite',
        orbit: 'orbit 28s linear infinite',
        'slide-up': 'slide-up 0.5s ease forwards',
        'fade-in': 'fade-in 0.4s ease forwards',
        'scale-in': 'scale-in 0.4s ease forwards',
      },
      boxShadow: {
        'glow-accent': '0 0 40px rgba(79,209,197,0.22)',
        'glow-accent2': '0 0 40px rgba(245,166,35,0.18)',
        'card': '0 4px 24px rgba(0,0,0,0.4)',
        'card-hover': '0 8px 40px rgba(0,0,0,0.6)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
