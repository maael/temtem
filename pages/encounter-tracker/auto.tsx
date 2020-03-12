import { createRef, useRef, useEffect, useState } from "react";
import { colors } from "@maael/temtem-theme";
import EncounterTrackerHeaderBar from "../../components/compositions/EncounterTrackerHeaderBar";
import { fabric } from "fabric";
import Jimp from "jimp";

declare const ImageCapture: any;

function mapFabricObjectToDetail(ob: fabric.Object) {
  return {
    name: ob.name,
    y: ob.aCoords!.tl.y,
    x: ob.aCoords!.tl.x,
    width: ob.aCoords!.tr.x - ob.aCoords!.tl.x - 5,
    height: ob.aCoords!.tr.y - ob.aCoords!.br.y - 5
  };
}

export default () => {
  const videoRef = createRef<HTMLVideoElement>();
  const videoOverlayRef = createRef<HTMLCanvasElement>();
  const rafRef = useRef<number>();
  const imageCapture = useRef<typeof ImageCapture>();
  const bitmapCanvas = useRef<HTMLCanvasElement>();
  const [defBb1, setDefBb1] = useState({
    name: "Defending Temtem 1",
    y: 50,
    x: 100,
    width: 50,
    height: 50
  });
  const [defBb2, setDefBb2] = useState({
    name: "Defending Temtem 2",
    y: 50,
    x: 200,
    width: 50,
    height: 50
  });
  const nameStateMap = {
    "Defending Temtem 1": setDefBb1,
    "Defending Temtem 2": setDefBb2
  };
  async function fn() {
    try {
      if (videoRef.current && imageCapture.current) {
        const imageBitmap = await imageCapture.current.grabFrame();
        if (!bitmapCanvas.current) {
          bitmapCanvas.current = document.createElement("canvas");
        }
        bitmapCanvas.current.height = imageBitmap.height;
        bitmapCanvas.current.width = imageBitmap.width;
        const context = bitmapCanvas.current.getContext("2d")!;
        context.clearRect(
          0,
          0,
          bitmapCanvas.current.width,
          bitmapCanvas.current.height
        );
        context.drawImage(
          imageBitmap,
          0,
          0,
          imageBitmap.width,
          imageBitmap.height
        );
        const dataUrl = bitmapCanvas.current.toDataURL();
        const img = await Jimp.read(dataUrl);
        const image64 = await img.invert().getBase64Async(Jimp.MIME_PNG);
        // console.info(image64); // TODO: Do something with the image64 here to show previews of what we're getting
      }
      rafRef.current = requestAnimationFrame(fn);
    } catch (e) {
      console.error("[error]", e);
    }
  }
  useEffect(() => {
    if (videoOverlayRef.current && videoRef.current) {
      const canvas = new fabric.Canvas(videoOverlayRef.current);
      canvas.setHeight(videoRef.current.clientHeight);
      canvas.setWidth(videoRef.current.clientWidth);
      const { wrapperEl } = canvas as any;
      wrapperEl.style.position = "absolute";
      wrapperEl.style.top = "0px";
      wrapperEl.style.left = "0px";
      const defendingBb1 = new fabric.Rect({
        name: defBb1.name,
        top: defBb1.y,
        left: defBb1.x,
        width: defBb1.width,
        height: defBb1.height,
        fill: "rgba(17,133,133,0.4)",
        strokeWidth: 5,
        stroke: "rgba(17,133,133, 0.8)",
        hasRotatingPoint: false, // ! Bug: Does nothing
        lockRotation: true,
        strokeUniform: true,
        paintFirst: "fill"
      });
      const defendingBb2 = new fabric.Rect({
        name: defBb2.name,
        top: defBb2.y,
        left: defBb2.x,
        width: defBb2.width,
        height: defBb2.height,
        fill: "rgba(17,133,133,0.4)",
        strokeWidth: 5,
        stroke: "rgba(17,133,133, 0.8)",
        hasRotatingPoint: false, // ! Bug: Does nothing
        lockRotation: true,
        strokeUniform: true,
        paintFirst: "fill"
      });
      canvas.add(defendingBb1);
      canvas.add(defendingBb2);

      canvas.on("object:moved", e => {
        if (!e.target) return;
        const detail = mapFabricObjectToDetail(e.target);
        if (detail.name && nameStateMap[detail.name]) {
          console.info(e.target, detail);
          nameStateMap[detail.name](detail);
        }
      });
      canvas.on("object:modified", e => {
        if (!e.target) return;
        const detail = mapFabricObjectToDetail(e.target);
        if (detail.name && nameStateMap[detail.name]) {
          console.info(e.target, detail);
          nameStateMap[detail.name](detail);
        }
      });
    }
  }, [videoOverlayRef.current, videoRef.current]);
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
        <div css={{ textAlign: "center" }}>
          <AutoTrackerBlockDetails
            name={defBb1.name}
            x={defBb1.x}
            y={defBb1.y}
            width={defBb1.width}
            height={defBb1.height}
            invert={true}
            threshold={0.9}
          />
          <AutoTrackerBlockDetails
            name={defBb2.name}
            x={defBb2.x}
            y={defBb2.y}
            width={defBb2.width}
            height={defBb2.height}
            invert={true}
            threshold={0.9}
          />
          <AutoTrackerBlockDetails
            name="Location/Route Information"
            x={0}
            y={0}
            width={100}
            height={100}
            invert={true}
            threshold={0.9}
          />
        </div>
      </div>
    </>
  );
};

interface AutoTrackerBlockDetailsProps {
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  invert: boolean;
  threshold: number;
}

function AutoTrackerBlockDetails({
  name,
  x,
  y,
  width,
  height,
  threshold,
  invert
}: AutoTrackerBlockDetailsProps) {
  return (
    <div css={{ display: "inline-block", margin: 10, textAlign: "left" }}>
      <div>{name}</div>
      <div>
        {x.toFixed(0)},{y.toFixed(0)} - {width.toFixed(0)}x{height.toFixed(0)}
      </div>
      <div>
        Inverted:{" "}
        <input type="checkbox" checked={invert} onChange={() => undefined} />
      </div>
      <div>
        Threshold:{" "}
        <input type="text" value={threshold} onChange={() => undefined} />
      </div>
    </div>
  );
}
