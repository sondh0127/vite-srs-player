
#  Vite SRS Player

- [X] RTC Vue
- [ ] RTC React
- [ ] RTC Svelte
- [ ] Hls

## Installation
```sh
pnpm install @sondh0127/vite-srs-player
```


```sh
yarn install @sondh0127/vite-srs-player
```

```sh
npm install @sondh0127/vite-srs-player
```
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

## Configuration:
- url: string -  Web RTC stream link
- autoStart: boolean should video autoplay
- images: Array<{src: string, x: number, y: number, w: number, h: number}> watermark image, support multiple image



