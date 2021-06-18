<template>
	<div>
		<SrsRtcPlayer :url="url" :auto-start="autoStart" />
	</div>
</template>

<script>
import { defineComponent, ref } from 'vue-demi'
// import SrsRtcPlayer from '../src/out/SrsRtcPlayer.vue'
import SrsRtcPlayer from '../dist/vite-srs-player.es.js'
// import '../dist/style.css'

export default defineComponent({
	components: {
		SrsRtcPlayer,
	},

	setup() {
		const url = ref(
			'webrtc://123.30.172.11:2885/live/aec8f3c2-51ac-4d87-a0ed-de9dab72d41e',
		)

		const isPlaying = ref(false)
		const autoStart = ref(true)

		return {
			url,
			autoStart,
		}
	},
})
</script>

<style></style>
