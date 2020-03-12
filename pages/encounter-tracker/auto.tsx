import { createRef, useRef } from "react";
import { colors } from "@maael/temtem-theme";
import EncounterTrackerHeaderBar from "../../components/compositions/EncounterTrackerHeaderBar";

declare const ImageCapture: any;

export default () => {
  const videoRef = createRef<HTMLVideoElement>();
  const videoOverlayRef = createRef<HTMLCanvasElement>();
  const rafRef = useRef<number>();
  const imageCapture = useRef<typeof ImageCapture>();
  async function fn() {
    if (videoRef.current && imageCapture.current) {
      const imageBitmap = await imageCapture.current.grabFrame();
      console.info(imageBitmap.height, imageBitmap.width);
    }
    rafRef.current = requestAnimationFrame(fn);
  }
  return (
    <>
      <EncounterTrackerHeaderBar />
      <div style={{ padding: 10 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 10
          }}
        >
          <div css={{ position: "relative" }}>
            <video
              ref={videoRef}
              autoPlay
              style={{
                background: colors.uiBlueFaded,
                width: "50vw"
              }}
            />
            <canvas
              ref={videoOverlayRef}
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
                height: "calc(100% - 6px)",
                width: "100%"
              }}
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center"
          }}
        >
          <button
            onClick={() => {
              (async () => {
                if (!videoRef.current) return;

                try {
                  const stream = await (navigator.mediaDevices as any).getDisplayMedia(
                    {
                      video: {
                        cursor: "never"
                      },
                      audio: false
                    }
                  );
                  videoRef.current.srcObject = stream;
                  const track = stream.getVideoTracks()[0];
                  imageCapture.current = new ImageCapture(track);
                  rafRef.current = requestAnimationFrame(fn);
                } catch (err) {
                  console.error(`Error: ${err.message}`);
                }
              })().catch(e => console.error(e));
            }}
          >
            Start
          </button>
          <button
            onClick={() => {
              if (rafRef.current) cancelAnimationFrame(rafRef.current);
              if (videoRef.current && videoRef.current.srcObject) {
                (videoRef.current.srcObject as any).getTracks()[0].stop();
                videoRef.current.srcObject = null;
              }
            }}
          >
            Stop
          </button>
        </div>
      </div>
    </>
  );
};
