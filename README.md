
#  Vite SRS Player

- [X] RTC Vue
- [ ] RTC React
- [ ] RTC Svelte
- [ ] Hls

## Usage
```vuejs
import SrsRtcPlayer from '@sondh0127/vite-srs-player'

<SrsRtcPlayer
  :url="url"
  :autoStart="true"
  :images="[
    { src: 'logo.png', x: 10, y: 10, w: 60, h: 50 },
  ]"
/>
```

## Config:
- url: Web RTC stream link
- autoStart: should video autoplay
- images: watermark image, support multiple image



