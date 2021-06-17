import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createVuePlugin } from 'vite-plugin-vue2'
import WindiCSS from 'vite-plugin-windicss'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		lib: {
			name: 'VueInteractive',
			entry: path.resolve(__dirname, 'src/main.ts'),
		},
		rollupOptions: {
			external: ['vue'],
			output: {
				globals: {
					vue: 'Vue',
				},
			},
		},
	},
	plugins: [
		vue({
			// include: ['demo/vue/**/*.{vue,jsx,tsx}'],
		}),
		// createVuePlugin({ include: ['demo/vue/**/*.{vue,jsx,tsx}'] }),
		WindiCSS(),
	],
	optimizeDeps: {
		exclude: ['vue-demi'],
	},
})
