import { EventEmitter } from "events";
import EncounterTrackerHeaderBar from "../../components/compositions/EncounterTrackerHeaderBar";
import EncounterAutoTracker from "../../components/compositions/EncounterAutoTracker";
import EncounterAutoTrackerStateful from "../../components/compositions/EncounterAutoTrackerStateful";

export default () => {
  const emitter = new EventEmitter();
  return (
    <>
      <EncounterTrackerHeaderBar />
      <EncounterAutoTracker onData={data => emitter.emit("data", data)} />
      <EncounterAutoTrackerStateful emitter={emitter} />
    </>
  );
};
