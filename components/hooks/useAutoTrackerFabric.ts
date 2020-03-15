import { useEffect, MutableRefObject } from "react";
import { fabric } from "fabric";
import { BoundingBox } from "./useAutoTrackerImage";
import {
  OverlayStorageKey,
  VideoToggleStorageKey
} from "../../util/localstorage";

function mapFabricObjectToDetail(ob: fabric.Object) {
  return {
    name: ob.name,
    y: ob.aCoords!.tl.y,
    x: ob.aCoords!.tl.x,
    width: ob.aCoords!.tr.x - ob.aCoords!.tl.x - 3,
    height: ob.aCoords!.br.y - ob.aCoords!.tr.y - 3
  };
}

export default function useAutoTrackerFabric(
  videoRef: MutableRefObject<HTMLVideoElement | null>,
  videoOverlayRef: MutableRefObject<HTMLCanvasElement | null>,
  defBb1: MutableRefObject<BoundingBox & { name: string }>,
  defBb2: MutableRefObject<BoundingBox & { name: string }>
) {
  useEffect(() => {
    const nameToRefMap = {
      "Defending Temtem 1": defBb1,
      "Defending Temtem 2": defBb2
    };
    if (videoOverlayRef.current && videoRef.current) {
      const canvas = new fabric.Canvas(videoOverlayRef.current);
      canvas.setHeight(videoRef.current.clientHeight);
      canvas.setWidth(videoRef.current.clientWidth);
      videoRef.current.onresize = () => {
        if (videoRef.current) {
          canvas.setHeight(videoRef.current.clientHeight);
          canvas.setWidth(videoRef.current.clientWidth);
        }
      };
      const { wrapperEl } = canvas as any;
      wrapperEl.style.position = "absolute";
      wrapperEl.style.top = "0px";
      wrapperEl.style.left = "0px";
      const defendingBb1 = new fabric.Rect({
        name: defBb1.current.name,
        top: defBb1.current.y,
        left: defBb1.current.x,
        width: defBb1.current.width,
        height: defBb1.current.height,
        fill: "rgba(17,133,133,0.4)",
        strokeWidth: 3,
        stroke: "rgba(17,133,133, 0.8)",
        hasRotatingPoint: false, // ! Bug: Does nothing
        lockRotation: true,
        strokeUniform: true,
        paintFirst: "fill"
      });
      const defendingBb2 = new fabric.Rect({
        name: defBb2.current.name,
        top: defBb2.current.y,
        left: defBb2.current.x,
        width: defBb2.current.width,
        height: defBb2.current.height,
        fill: "rgba(17,133,133,0.4)",
        strokeWidth: 3,
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
        if (detail.name && nameToRefMap[detail.name]) {
          nameToRefMap[detail.name].current = detail;
          localStorage.setItem(
            OverlayStorageKey,
            JSON.stringify({
              "Defending Temtem 1": defBb1.current,
              "Defending Temtem 2": defBb2.current
            })
          );
        }
      });
      canvas.on("object:modified", e => {
        if (!e.target) return;
        const detail = mapFabricObjectToDetail(e.target);
        if (detail.name && nameToRefMap[detail.name]) {
          nameToRefMap[detail.name].current = detail;
          localStorage.setItem(
            OverlayStorageKey,
            JSON.stringify({
              "Defending Temtem 1": defBb1.current,
              "Defending Temtem 2": defBb2.current
            })
          );
        }
      });
      canvas.on("after:render", () => {
        try {
          document
            .querySelector("video")!
            .parentElement!.parentElement!.classList.toggle(
              "auto-tracker-hide-video",
              isVideoHidden()
            );
        } catch (e) {
          console.error("[error]", e.message);
        }
      });
    }
  }, [videoOverlayRef.current, videoRef.current]);
}

function isVideoHidden() {
  try {
    return JSON.parse(localStorage.getItem(VideoToggleStorageKey) || "false");
  } catch {
    return false;
  }
}
