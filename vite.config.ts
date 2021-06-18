import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createVuePlugin } from 'vite-plugin-vue2'
import WindiCSS from 'vite-plugin-windicss'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		// vue(),
		createVuePlugin({}),
		// WindiCSS(),
	],
	resolve: {
		alias: {
			'@': `${path.resolve(__dirname, 'src')}`,
		},
		dedupe: ['vue-demi'],
	},
	build: {
		lib: {
			name: 'VueInteractive',
			// entry: path.resolve(__dirname, 'src/main.ts'),
			entry: path.resolve(__dirname, 'src/main.lite.ts'),
		},
		minify: false,
		rollupOptions: {
			external: ['vue'],
			output: {
				globals: {
					vue: 'Vue',
				},
			},
		},
	},
	optimizeDeps: {
		exclude: ['vue-demi'],
	},
})
