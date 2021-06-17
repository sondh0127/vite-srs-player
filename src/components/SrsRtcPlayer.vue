<script lang="ts">
import { ref, defineComponent, watch } from 'vue-demi'
import { SrsRtcPlayerAsync } from './SrsRtcPlayerAsync'

export default defineComponent({
	props: {
		isPlaying: Boolean,
		url: String,
		autoStart: Boolean,
	},
	setup(props) {
		const showVideo = ref(false)
		const muted = ref(true)
		const srcObject = ref(null)
		const sessionId = ref('')
		const simulatorDrop = ref('')

		let sdk: any = null // Global handler to do cleanup when replaying.
		const startPlay = () => {
			showVideo.value = true
			// Close PC when user replay.
			if (sdk) {
				sdk.close()
			}
			sdk = SrsRtcPlayerAsync()
			// https://webrtc.org/getting-started/remote-streams
			srcObject.value = sdk.stream
			// Optional callback, SDK will add track to stream.
			// sdk.ontrack = function (event) { console.log('Got track', event); sdk.stream.addTrack(event.track); };

			// For example: webrtc://r.ossrs.net/live/livestream
			const url = props.url
			sdk
				.play(url)
				.then(function (session: any) {
					sessionId.value = session.sessionid
					simulatorDrop.value =
						session.simulator + '?drop=1&username=' + session.sessionid
				})
				.catch(function (reason: any) {
					sdk.close()
					showVideo.value = false
					console.error(reason)
				})
		}

		showVideo.value = false

		watch(
			() => props.isPlaying,
			(newValue) => {
				if (newValue) {
					muted.value = false
					startPlay()
				} else {
					if (sdk) {
						sdk.close()
					}
					showVideo.value = false
				}
			},
		)

		if (props.autoStart) {
			muted.value = true

			startPlay()
		}

		return {
			showVideo,
			srcObject,
			muted,
			sessionId,
			simulatorDrop,
		}
	},
})
</script>

<template>
	<video
		v-show="showVideo"
		:srcObject="srcObject"
		controls
		autoplay
		:muted="muted"
	></video>
	<slot name="session" :session="{ sessionId, simulatorDrop }"></slot>
</template>
<style></style>
