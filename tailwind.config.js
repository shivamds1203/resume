/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'Space Grotesk', 'system-ui', 'sans-serif'],
                display: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
            },
            colors: {
                bg: '#03040a',
                'bg-2': '#070b14',
                accent: '#6c63ff',
                'accent-2': '#06b6d4',
                'accent-3': '#f472b6',
            },
            animation: {
                'pulse-dot': 'pulse-dot 1.8s infinite',
                'gradient-shift': 'gradient-shift 4s ease infinite',
                'float-1': 'float-1 6s ease-in-out infinite',
                'float-2': 'float-2 7s ease-in-out infinite 0.5s',
                'float-3': 'float-3 5.5s ease-in-out infinite 1s',
                'fade-in': 'fadeIn 0.6s ease forwards',
            },
            keyframes: {
                'pulse-dot': {
                    '0%': { boxShadow: '0 0 0 0 rgba(6,214,160,0.6)' },
                    '70%': { boxShadow: '0 0 0 8px rgba(6,214,160,0)' },
                    '100%': { boxShadow: '0 0 0 0 rgba(6,214,160,0)' },
                },
                'gradient-shift': {
                    '0%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                    '100%': { backgroundPosition: '0% 50%' },
                },
                'float-1': {
                    '0%, 100%': { transform: 'translateY(0px) rotateX(4deg) rotateY(-4deg)' },
                    '50%': { transform: 'translateY(-14px) rotateX(-4deg) rotateY(4deg)' },
                },
                'float-2': {
                    '0%, 100%': { transform: 'translateY(0px) rotateX(-3deg) rotateY(5deg)' },
                    '50%': { transform: 'translateY(-10px) rotateX(3deg) rotateY(-5deg)' },
                },
                'float-3': {
                    '0%, 100%': { transform: 'translateY(0px) rotateX(2deg) rotateY(-6deg)' },
                    '50%': { transform: 'translateY(-18px) rotateX(-2deg) rotateY(6deg)' },
                },
                fadeIn: {
                    from: { opacity: '0', transform: 'translateY(20px)' },
                    to: { opacity: '1', transform: 'translateY(0)' },
                },
            },
            backgroundSize: {
                '200': '200% 200%',
            },
        },
    },
    plugins: [],
};
