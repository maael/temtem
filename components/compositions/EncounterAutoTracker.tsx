import { createRef, useRef, memo } from "react";
import { colors } from "@maael/temtem-theme";
import TemtemButton from "@maael/temtem-button-component";
import useAutoTrackerImage from "../hooks/useAutoTrackerImage";
import useAutoTrackerFabric, {
  OverlayStorageKey
} from "../hooks/useAutoTrackerFabric";

declare const ImageCapture: any;

export default memo(
  ({ onData }: { onData: (data: Record<string, string>) => void }) => {
    const videoRef = createRef<HTMLVideoElement>();
    const videoOverlayRef = createRef<HTMLCanvasElement>();
    const previewRef = createRef<HTMLImageElement>();
    const previewRef2 = createRef<HTMLImageElement>();
    const rafRef = useRef<number>();
    const imageCapture = useRef<typeof ImageCapture>();
    const bitmapCanvas = useRef<HTMLCanvasElement>();
    let storage = {
      "Defending Temtem 1": {
        name: "Defending Temtem 1",
        y: 50,
        x: 100,
        width: 50,
        height: 50
      },
      "Defending Temtem 2": {
        name: "Defending Temtem 2",
        y: 50,
        x: 200,
        width: 50,
        height: 50
      }
    };
    try {
      storage = Object.assign(
        storage,
        JSON.parse(localStorage.getItem(OverlayStorageKey) || "{}")
      );
    } catch (e) {
      console.error("[error]", e.message);
    }
    const defBb1 = useRef(storage["Defending Temtem 1"]);
    const defBb2 = useRef(storage["Defending Temtem 2"]);
    const [emitter, autoTrackerImageFn] = useAutoTrackerImage(
      videoRef,
      videoOverlayRef,
      imageCapture,
      bitmapCanvas,
      previewRef,
      previewRef2,
      rafRef,
      defBb1,
      defBb2
    );
    emitter.on("text", onData);
    useAutoTrackerFabric(videoRef, videoOverlayRef, defBb1, defBb2);
    return (
      <div css={{ marginTop: 10, paddingRight: 10, paddingLeft: 10 }}>
        <div css={{ textAlign: "center", marginBottom: 5 }}>
          <TemtemButton
            style={{ marginRight: 10 }}
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
                  rafRef.current = requestAnimationFrame(autoTrackerImageFn);
                } catch (err) {
                  console.error(`Error: ${err.message}`);
                }
              })().catch(e => console.error(e));
            }}
          >
            Start
          </TemtemButton>
          <TemtemButton
            style={{ marginRight: 10 }}
            onClick={() => {
              if (rafRef.current) cancelAnimationFrame(rafRef.current);
              if (videoRef.current && videoRef.current.srcObject) {
                (videoRef.current.srcObject as any).getTracks()[0].stop();
                videoRef.current.srcObject = null;
              }
            }}
          >
            Stop
          </TemtemButton>
          <TemtemButton
            onClick={() => {
              if (videoRef.current) {
                videoRef.current.parentElement!.parentElement!.classList.toggle(
                  "auto-tracker-hide-video"
                );
              }
            }}
          >
            Toggle Video
          </TemtemButton>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 10
          }}
        >
          <div css={{ position: "relative" }}>
            <video
              ref={videoRef}
              autoPlay
              style={{
                background: colors.uiOutline,
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
          css={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <img ref={previewRef} style={{ marginRight: 10 }} />
          <img ref={previewRef2} />
        </div>
      </div>
    );
  },
  () => false
);
