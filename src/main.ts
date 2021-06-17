import 'virtual:windi.css'
import type { Plugin } from 'vue-demi'

import components from './components'

export const VueInteractive: Plugin = {
	install(app) {
		Object.entries(components).forEach(([key, value]: [string, any]) => {
			app.component(key, value)
		})
	},
}

// START_EXPORTS
// END_EXPORTS
