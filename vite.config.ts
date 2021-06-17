import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
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
	plugins: [vue(), WindiCSS()],
	optimizeDeps: {
		exclude: ['vue-demi'],
	},
})
