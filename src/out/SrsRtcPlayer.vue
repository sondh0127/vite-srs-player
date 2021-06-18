<template>
  <video
    ref="videoTargetRef"
    :autoPlay="true"
    :playsInline="true"
    :muted="true"
  ></video>
</template>
<script>
import { SrsRtcPlayerAsync } from "../components/SrsRtcPlayerAsync";
import { WebRtcSB } from "../components/WebRtcShitBlt";

export default {
  props: ["images", "url", "autoStart"],

  data: () => ({
    showVideo: false,
    muted: true,
    srcObject: null,
    sessionId: "",
    simulatorDrop: "",
    SrsRtcPlayerAsync,
    WebRtcSB,
  }),

  mounted() {
    let sdk = null;

    const startPlay = () => {
      this.showVideo = true; // Close PC when user replay.

      if (sdk) {
        sdk.close();
      }

      sdk = SrsRtcPlayerAsync(); // https://webrtc.org/getting-started/remote-streams

      WebRtcSB(sdk.stream, this.$refs.videoTargetRef, this.images || []); // Optional callback, SDK will add track to stream.
      // sdk.ontrack = function (event) { console.log('Got track', event); sdk.stream.addTrack(event.track); };

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
