import { useState, useRef, useEffect } from "react";
import { SrsRtcPlayerAsync } from "../components/SrsRtcPlayerAsync";

export default function MyComponent(props) {
  const [showVideo, setShowVideo] = useState(() => false);
  const [muted, setMuted] = useState(() => true);
  const [srcObject, setSrcObject] = useState(() => null);
  const [sessionId, setSessionId] = useState(() => "");
  const [simulatorDrop, setSimulatorDrop] = useState(() => "");

  const videoRef = useRef();

  useEffect(() => {
    let sdk = null;

    const startPlay = () => {
      setShowVideo(true); // Close PC when user replay.

      if (sdk) {
        sdk.close();
      }

      sdk = SrsRtcPlayerAsync(); // https://webrtc.org/getting-started/remote-streams

      setSrcObject(sdk.stream);
      console.log("🇻🇳 ~ file: jsx.lite.jsx ~ line 27 ~ srcObject", srcObject);
      videoRef.current.srcObject = sdk.stream;
      console.log(
        "🇻🇳 ~ file: jsx.lite.jsx ~ line 52 ~ videoRef",
        videoRef.current
      ); // Optional callback, SDK will add track to stream.
      // sdk.ontrack = function (event) { console.log('Got track', event); sdk.stream.addTrack(event.track); };
      // For example: webrtc://r.ossrs.net/live/livestream

      const url = props.url;
      sdk
        .play(url)
        .then((session) => {
          setSessionId(session.sessionid);
          setSimulatorDrop(
            session.simulator + "?drop=1&username=" + session.sessionid
          );
        })
        .catch((reason) => {
          sdk.close();
          setShowVideo(false);
          console.error(reason);
        });
    };

    if (props.autoStart) {
      setMuted(true);
      startPlay();
    }
  }, []);

  return (
    <>
      <video controls="" autoplay="" ref={videoRef} muted={muted}></video>
    </>
  );
}
