module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        futuristic: '#0f172a',
        accent: '#38bdf8',
        glow: '#a5b4fc',
        neutral: {
          800: "#27272a",
          900: "#18181b"
        }
      },
      boxShadow: {
        neon: '0 0 16px #38bdf8, 0 0 32px #a5b4fc',
        lg: "0 8px 32px rgba(0,0,0,0.25)"
      },
      backdropBlur: {
        lg: '16px',
        '2xl': '32px'
      },
      animation: {
        fadein: 'fadein 0.7s ease',
        bouncein: 'bouncein 0.7s cubic-bezier(.68,-0.55,.27,1.55)'
      },
      keyframes: {
        fadein: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' }
        },
        bouncein: {
          '0%': { opacity: 0, transform: 'scale(0.8)' },
          '60%': { opacity: 1, transform: 'scale(1.05)' },
          '100%': { opacity: 1, transform: 'scale(1)' }
        }
      },
      fontFamily: {
        'sans': ['SF Pro Display', 'SF Pro Text', 'SF Pro Icons', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
      },
    }
  },
  plugins: []
}
