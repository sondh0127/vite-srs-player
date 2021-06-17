import { defineConfig } from 'windicss/helpers'
const isProduction = process.env.NODE_ENV === 'production'
console.log(
	'🇻🇳 ~ file: windicss.config.ts ~ line 3 ~ isProduction',
	isProduction,
)
let include = ['index.html', 'src/**/*.{vue,html,jsx,tsx}']
if (!isProduction) include = [...include, 'demo/**/*.{vue,html,jsx,tsx}']

export default defineConfig({
	preflight: false,
	extract: {
		// accepts globs and file paths relative to project root
		include: include,
		exclude: ['node_modules/**/*', '.git/**/*'],
	},
})
