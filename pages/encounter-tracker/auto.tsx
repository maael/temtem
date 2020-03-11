import { createRef } from "react";
import { colors } from "@maael/temtem-theme";
import EncounterTrackerHeaderBar from "../../components/compositions/EncounterTrackerHeaderBar";

export default () => {
  const videoRef = createRef<HTMLVideoElement>();
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
          <video
            ref={videoRef}
            autoPlay
            style={{
              background: colors.uiBlueFaded,
              width: "30vw"
            }}
          />
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
                  videoRef.current.srcObject = await (navigator.mediaDevices as any).getDisplayMedia(
                    {
                      video: {
                        cursor: "never"
                      },
                      audio: false
                    }
                  );
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
