<script setup lang="ts">
import { ref } from 'vue-demi'

const url = ref(
	'webrtc://123.30.172.11:2885/live/aec8f3c2-51ac-4d87-a0ed-de9dab72d41e',
)

const isPlaying = ref(false)
const autoStart = ref(false)

function play() {
	isPlaying.value = true
}

function pause() {
	isPlaying.value = false
}
</script>

<template>
	<div class="bg-gray-300">
		<label></label>
		<div class="">
			URL:
			<input type="text" v-model="url" class="border border-gray-500" />
			<button @click="play" class="">Play</button>
			<button @click="pause" class="">Pause</button>
		</div>
		<SrsRtcPlayer :isPlaying="isPlaying" :url="url" :autoStart="autoStart">
			<template v-slot:session="{ session }">
				<div class="">
					<label></label>
					SessionID: <span>{{ session.sessionId }}</span>

					<label></label>
					Simulator: <a :href="session.simulatorDrop">Drop</a>
				</div>
			</template>
		</SrsRtcPlayer>
	</div>
</template>

<style>
html,
body {
	width: 100%;
	height: 100%;
}

#app {
	width: 100%;
	height: 100%;
}
</style>
