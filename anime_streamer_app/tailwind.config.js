/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: '#2B5D3A',
					foreground: 'hsl(var(--primary-foreground))',
				},
				secondary: {
					DEFAULT: '#4A90E2',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				accent: {
					DEFAULT: '#F5A623',
					foreground: 'hsl(var(--accent-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
				// Cyberpunk Futuristic Colors
				cyber: {
					'dark': '#0a0a0a',
					'darker': '#050505',
					'blue': '#00ffff',
					'purple': '#bf00ff',
					'pink': '#ff00ff',
					'green': '#00ff41',
					'orange': '#ff8800',
					'red': '#ff0080',
					'yellow': '#ffff00',
				},
				neon: {
					'blue': '#0ff',
					'purple': '#b0f',
					'pink': '#f0f',
					'green': '#0f4',
					'orange': '#f80',
					'red': '#f08',
					'cyan': '#0ff',
				},
				glass: {
					'dark': 'rgba(10, 10, 10, 0.7)',
					'darker': 'rgba(5, 5, 5, 0.8)',
					'blue': 'rgba(0, 255, 255, 0.1)',
					'purple': 'rgba(191, 0, 255, 0.1)',
					'pink': 'rgba(255, 0, 255, 0.1)',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			backdropBlur: {
				'xs': '2px',
			},
			boxShadow: {
				'neon': '0 0 20px currentColor',
				'neon-lg': '0 0 40px currentColor',
				'cyber': '0 0 20px rgba(0, 255, 255, 0.5)',
				'cyber-lg': '0 0 40px rgba(0, 255, 255, 0.5)',
				'purple-neon': '0 0 20px rgba(191, 0, 255, 0.5)',
				'pink-neon': '0 0 20px rgba(255, 0, 255, 0.5)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: 0 },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: 0 },
				},
				'glow-pulse': {
					'0%, 100%': { boxShadow: '0 0 20px currentColor' },
					'50%': { boxShadow: '0 0 40px currentColor, 0 0 60px currentColor' },
				},
				'neon-flicker': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.8' },
					'25%, 75%': { opacity: '0.9' },
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' },
				},
				'scan-line': {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(100%)' },
				},
				'matrix-rain': {
					'0%': { transform: 'translateY(-100%)' },
					'100%': { transform: 'translateY(100vh)' },
				},
				'cyber-zoom': {
					'0%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.05)' },
					'100%': { transform: 'scale(1)' },
				},
				'pulse-border': {
					'0%, 100%': { borderColor: 'rgba(0, 255, 255, 0.5)' },
					'50%': { borderColor: 'rgba(0, 255, 255, 1)' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
				'neon-flicker': 'neon-flicker 3s ease-in-out infinite',
				'float': 'float 3s ease-in-out infinite',
				'scan-line': 'scan-line 2s linear infinite',
				'matrix-rain': 'matrix-rain 3s linear infinite',
				'cyber-zoom': 'cyber-zoom 4s ease-in-out infinite',
				'pulse-border': 'pulse-border 2s ease-in-out infinite',
			},
			backgroundImage: {
				'cyber-grid': `
					linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px),
					linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)
				`,
				'neon-gradient': 'linear-gradient(45deg, #00ffff, #bf00ff, #ff00ff)',
				'cyber-gradient': 'linear-gradient(135deg, rgba(0,255,255,0.1), rgba(191,0,255,0.1), rgba(255,0,255,0.1))',
			},
			backgroundSize: {
				'grid': '50px 50px',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
}
