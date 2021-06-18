// import 'virtual:windi.css'
// import type { App } from 'vue-demi'

// import components from './components'

// export const VueInteractive = {
// 	install(app: App) {
// 		Object.entries(components).forEach(([key, value]: [string, any]) => {
// 			app.component(key, value)
// 		})
// 	},
// }

// START_EXPORTS
// END_EXPORTS

import MyComponent from './components/SrsRtcPlayer.vue'
// @ts-ignore
MyComponent.install = (vue) => vue.component('MyComponent', MyComponent)
export default MyComponent
