import { createRef, HTMLProps } from "react";

export default function SafeImage({
  ...props
}: HTMLProps<HTMLImageElement> & { setWidthOnError?: boolean }) {
  const imgRef = createRef<HTMLImageElement>();
  return (
    <img
      {...(props as any)}
      ref={imgRef}
      onError={() => {
        if (imgRef.current) {
          imgRef.current.src =
            "https://temtem-api.mael.tech/images/portraits/temtem/large/Ganki.png";
        }
      }}
    />
  );
}
