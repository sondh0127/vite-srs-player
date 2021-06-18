function ImageCopy(canvasContext, hiddenVideoElement) {
	canvasContext.drawImage(
		hiddenVideoElement,
		0,
		0,
		hiddenVideoElement.videoWidth,
		hiddenVideoElement.videoHeight,
	)
}

function ImageAdd({ src, x, y, w, h }) {
	const image = new Image()
	image.src = src

	return {
		manipulate(canvasContext) {
			canvasContext.drawImage(image, x, y, w, h)
		},
	}
}

// export class WebRtcSB {
// 	constructor(constraints = { video: true, audio: true }) {
// 		this._constraints = constraints
// 		this._createHiddenVideoElement()
// 	}

// 	setManipulators(ImageManipulators) {
// 		this._ImageManipulators = ImageManipulators
// 	}

// 	// returns a promise resolving to a MediaStream
// 	sbStartCapture() {
// 		return Promise.resolve()
// 			.then(() => {
// 				return navigator.mediaDevices.getUserMedia(this._constraints)
// 			})
// 			.then((stream) => {
// 				this._hiddenVideoElement.srcObject = stream
// 				return Promise.resolve()
// 			})
// 			.then(() => {
// 				this._createHiddenCanvas()
// 				requestAnimationFrame(this._sendImageToCanvas.bind(this))
// 				return this._hiddenCanvasElement.captureStream()
// 			})
// 	}

// 	_createHiddenVideoElement() {
// 		this._hiddenVideoElement = document.createElement('video')
// 		this._hiddenVideoElement.setAttribute('autoplay', 'true')
// 		this._hiddenVideoElement.setAttribute('playsinline', true)

// 		// safari wont play the video if the element is not visible on screen, so instead of hidden, put a 1 pix
// 		if (this._isSafari()) {
// 			this._hiddenVideoElement.setAttribute('width', '1px')
// 			this._hiddenVideoElement.setAttribute('height', '1px')
// 		} else {
// 			this._hiddenVideoElement.style.display = 'none'
// 		}
// 		document.body.appendChild(this._hiddenVideoElement)
// 	}

// 	_createHiddenCanvas() {
// 		this._hiddenCanvasElement = document.createElement('canvas')
// 		this._hiddenCanvasElement.style.display = 'none'
// 		this._hiddenCanvasElement.setAttribute('width', '0')
// 		this._hiddenCanvasElement.setAttribute('height', '0')
// 		document.body.appendChild(this._hiddenCanvasElement)
// 		this._sbVidContext = this._hiddenCanvasElement.getContext('2d')
// 	}

// 	_sendImageToCanvas() {
// 		if (
// 			this._hiddenCanvasElement.width === 0 &&
// 			this._hiddenVideoElement.videoWidth !== 0
// 		) {
// 			this._hiddenCanvasElement.setAttribute(
// 				'width',
// 				this._hiddenVideoElement.videoWidth,
// 			)
// 			this._hiddenCanvasElement.setAttribute(
// 				'height',
// 				this._hiddenVideoElement.videoHeight,
// 			)
// 		}

// 		if (this._hiddenCanvasElement.width !== 0) {
// 			this._ImageManipulators.forEach((manipulator) => {
// 				manipulator.manipulate(this._sbVidContext, this._hiddenVideoElement)
// 			})
// 		}
// 		requestAnimationFrame(this._sendImageToCanvas.bind(this))
// 	}

// 	_isSafari() {
// 		var ua = navigator.userAgent.toLowerCase()
// 		if (ua.indexOf('safari') != -1) {
// 			if (ua.indexOf('chrome') == -1) {
// 				return true
// 			}
// 		}
// 		return false
// 	}
// }

export const WebRtcSB = (sdkStream, videoTargetRef_, images) => {
	const videoRef_ = document.createElement('video')
	videoRef_.autoplay = true
	videoRef_.muted = true
	videoRef_.playinline = true
	videoRef_.width = 0
	videoRef_.srcObject = sdkStream
	document.body.appendChild(videoRef_)

	const ImageManipulators = []
	images.forEach((image) => ImageManipulators.push(ImageAdd(image)))

	const canvasEle = document.createElement('canvas')
	canvasEle.style.display = 'none'
	canvasEle.setAttribute('width', '0')
	canvasEle.setAttribute('height', '0')
	document.body.appendChild(canvasEle)
	const canvasCtx = canvasEle.getContext('2d')

	const _sendImageToCanvas = () => {
		if (canvasEle.width === 0 && videoRef_.videoWidth !== 0) {
			canvasEle.setAttribute('width', videoRef_.videoWidth)
			canvasEle.setAttribute('height', videoRef_.videoHeight)
		}

		if (canvasEle.width !== 0) {
			ImageCopy(canvasCtx, videoRef_)
			ImageManipulators.forEach((image) => {
				image.manipulate(canvasCtx, videoRef_)
			})
		}
		requestAnimationFrame(() => {
			_sendImageToCanvas()
		})
	}

	requestAnimationFrame(() => {
		_sendImageToCanvas()
	})

	videoTargetRef_.srcObject = canvasEle.captureStream()
}
