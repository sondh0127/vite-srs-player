import { useState, Show, For, onMount, useRef } from '@jsx-lite/core'
import { SrsRtcPlayerAsync } from '../components/SrsRtcPlayerAsync'
import {WebRtcSB} from '../components/WebRtcShitBlt'

export default function MyComponent(props) {
	const videoTargetRef = useRef()

	const state = useState({
		showVideo: false,
		muted: true,
		srcObject: null,
		sessionId: '',
		simulatorDrop: '',
		// list: ['hello', 'world'],
		// addItem() {
		// 	state.list = [...state.list, state.newItemName]
		// },
	})

	

	onMount(() => {
	

		let sdk = null
		const startPlay = () => {
			state.showVideo = true
			// Close PC when user replay.
			if (sdk) {
				sdk.close()
			}
			sdk = SrsRtcPlayerAsync()
			// https://webrtc.org/getting-started/remote-streams


			WebRtcSB(sdk.stream, videoTargetRef, props.images || [])
			// Optional callback, SDK will add track to stream.
			// sdk.ontrack = function (event) { console.log('Got track', event); sdk.stream.addTrack(event.track); };

			const url = props.url
			sdk
				.play(url)
				.then((session) => {
					state.sessionId = session.sessionid
					state.simulatorDrop =
						session.simulator + '?drop=1&username=' + session.sessionid
				})
				.catch((reason) => {
					sdk.close()
					state.showVideo = false
					console.error(reason)
				})
		}

		if (props.autoStart) {
			state.muted = true

			startPlay()
		}
	})

	return (
		// <div>
		// 	<Show when={props.showInput}>
		// 		<input
		// 			value={state.newItemName}
		// 			onChange={(event) => (state.newItemName = event.target.value)}
		// 		/>
		// 	</Show>
		// 	<div css={{ padding: '10px' }}>
		// 		<button onClick={() => state.addItem()}>Add list item</button>
		// 		<div>
		// 			<For each={state.list}>{(item) => <div>{item}</div>}</For>
		// 		</div>
		// 	</div>
		// </div>
		// <Show when={state.showVideo}>
		<video
			ref={videoTargetRef}
			autoPlay={true}
			playsInline={true}
			muted={true}
		/>
		// </Show>
	)
}
