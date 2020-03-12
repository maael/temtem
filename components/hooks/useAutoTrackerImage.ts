import { useCallback, MutableRefObject } from "react";
import Jimp from "jimp";

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
  rafRef: MutableRefObject<number | undefined>,
  defBb1: MutableRefObject<BoundingBox>
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
        const image64 = await img
          .crop(
            defBb1.current.x * modifier,
            defBb1.current.y * modifier,
            defBb1.current.width * modifier,
            defBb1.current.height * modifier
          )
          .invert()
          .getBase64Async(Jimp.MIME_PNG);
        if (previewRef.current) previewRef.current.src = image64;
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
