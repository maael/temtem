import { createRef, useRef, memo } from "react";
import { colors } from "@maael/temtem-theme";
import useAutoTrackerImage from "../hooks/useAutoTrackerImage";
import useAutoTrackerFabric from "../hooks/useAutoTrackerFabric";

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
    const defBb1 = useRef({
      name: "Defending Temtem 1",
      y: 50,
      x: 100,
      width: 50,
      height: 50
    });
    const defBb2 = useRef({
      name: "Defending Temtem 2",
      y: 50,
      x: 200,
      width: 50,
      height: 50
    });
    console.info("mount", videoRef.current);
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
        <img ref={previewRef} />
        <img ref={previewRef2} />
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
                  rafRef.current = requestAnimationFrame(autoTrackerImageFn);
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
    );
  },
  () => false
);
