import { useCallback, MutableRefObject } from "react";
import Jimp from "jimp";
import { createScheduler, createWorker } from "tesseract.js";

declare const ImageCapture: any;

export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export default function useAutoTrackerImage(
  videoRef: MutableRefObject<HTMLVideoElement | null>,
  videoOverlayRef: MutableRefObject<HTMLCanvasElement | null>,
  imageCapture: MutableRefObject<typeof ImageCapture | null>,
  bitmapCanvas: MutableRefObject<HTMLCanvasElement | undefined>,
  previewRef: MutableRefObject<HTMLImageElement | null>,
  previewRef2: MutableRefObject<HTMLImageElement | null>,
  rafRef: MutableRefObject<number | undefined>,
  defBb1: MutableRefObject<BoundingBox>,
  defBb2: MutableRefObject<BoundingBox>
) {
  const fn = useCallback(async () => {
    try {
      if (videoRef.current && videoOverlayRef.current && imageCapture.current) {
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
        const modifier =
          bitmapCanvas.current.height / videoRef.current.clientHeight;
        const scheduler = createScheduler();
        const worker = createWorker();
        await worker.load();
        await worker.loadLanguage("eng");
        await worker.initialize("eng");
        scheduler.addWorker(worker);
        const image64 = await img
          .clone()
          .crop(
            defBb1.current.x * modifier,
            defBb1.current.y * modifier,
            defBb1.current.width * modifier,
            defBb1.current.height * modifier
          )
          .invert()
          .getBase64Async(Jimp.MIME_PNG);
        const image642 = await img
          .clone()
          .crop(
            defBb2.current.x * modifier,
            defBb2.current.y * modifier,
            defBb2.current.width * modifier,
            defBb2.current.height * modifier
          )
          .invert()
          .getBase64Async(Jimp.MIME_PNG);
        if (previewRef.current) {
          previewRef.current.src = image64;
        }
        if (previewRef2.current) {
          previewRef2.current.src = image642;
        }
        const {
          data: { text }
        } = await scheduler.addJob("recognize", image64);
        console.info(
          "data",
          text
            .split("")
            .filter(i => `${i}`.match(/[a-zA-Z\s]/))
            .join("")
            .trim()
        );
        await scheduler.terminate();
        rafRef.current = requestAnimationFrame(fn);
      }
    } catch (e) {
      console.error("[error]", e);
    }
  }, [
    videoRef,
    videoOverlayRef,
    imageCapture,
    bitmapCanvas,
    previewRef,
    rafRef,
    defBb1
  ]);
  return fn;
}
