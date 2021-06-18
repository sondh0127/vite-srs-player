<template>
  <video controls="" autoplay="" ref="videoRef" :muted="muted"></video>
</template>
<script>
import { SrsRtcPlayerAsync } from "../components/SrsRtcPlayerAsync";

export default {
  props: ["url", "autoStart"],

  data: () => ({
    showVideo: false,
    muted: true,
    srcObject: null,
    sessionId: "",
    simulatorDrop: "",
    SrsRtcPlayerAsync,
  }),

  mounted() {
    let sdk = null;

    const startPlay = () => {
      this.showVideo = true; // Close PC when user replay.

      if (sdk) {
        sdk.close();
      }

      sdk = SrsRtcPlayerAsync(); // https://webrtc.org/getting-started/remote-streams

      this.srcObject = sdk.stream;
      console.log(
        "🇻🇳 ~ file: jsx.lite.jsx ~ line 27 ~ this.srcObject",
        this.srcObject
      );
      this.$refs.videoRef.srcObject = sdk.stream;
      console.log(
        "🇻🇳 ~ file: jsx.lite.jsx ~ line 52 ~ videoRef",
        this.$refs.videoRef
      ); // Optional callback, SDK will add track to stream.
      // sdk.ontrack = function (event) { console.log('Got track', event); sdk.stream.addTrack(event.track); };
      // For example: webrtc://r.ossrs.net/live/livestream

      const url = this.url;
      sdk
        .play(url)
        .then((session) => {
          this.sessionId = session.sessionid;
          this.simulatorDrop =
            session.simulator + "?drop=1&username=" + session.sessionid;
        })
        .catch((reason) => {
          sdk.close();
          this.showVideo = false;
          console.error(reason);
        });
    };

    if (this.autoStart) {
      this.muted = true;
      startPlay();
    }
  },
};
</script>
