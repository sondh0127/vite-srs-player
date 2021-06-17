<script lang="ts">
import { ref, reactive, defineComponent } from 'vue-demi'

export default defineComponent({
	setup() {
		const count = ref(0)
		return { count }
	},
})
</script>

<template>SRS Player</template>
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
