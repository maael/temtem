import { EventEmitter } from "events";
import EncounterTrackerHeaderBar from "../../components/compositions/EncounterTrackerHeaderBar";
import EncounterAutoTracker from "../../components/compositions/EncounterAutoTracker";
import EncounterAutoTrackerStateful from "../../components/compositions/EncounterAutoTrackerStateful";
import LocalstorageNotification from "../../components/primitives/LocalstorageNotification";
import Notification from "../../components/primitives/Notification";

export default () => {
  const emitter = new EventEmitter();
  return (
    <>
      <EncounterTrackerHeaderBar />
      <LocalstorageNotification name="auto-tracker-info">
        <Notification>
          <>
            <b>What is this?</b>
            <div>
              A tool to watch your screen, and track any temtem you encounter
              automagically. Nothing is sent to the server, it's all done in
              your browser.
            </div>
            <b>How do I use this?</b>
            <div>
              <ol>
                <li>
                  Hit <b>Start</b>, and your browser will ask you to choose a
                  screen or application to share, choose Temtem, or your screen
                  with Temtem on.
                </li>
                <li>
                  Move and resize the blue rectangles to where the Temtem names
                  are in an encounter (It's probably easier to do this while in
                  an Encounter).
                </li>
                <li>
                  That should be it! You should see the Temtem appear below the
                  video, and a list of encounters. You can hit <b>Save</b> at
                  any time to save the encounters to your account. You can hit{" "}
                  <b>Stop</b> to stop the tool watching the screen at any time.
                </li>
              </ol>
            </div>
            <div>At the moment it only tracks Temtem names.</div>
            <div>
              Once you've got it set up, you can hit <b>Toggle video</b> to hide
              the screen settings.
            </div>
          </>
        </Notification>
      </LocalstorageNotification>
      <EncounterAutoTracker onData={data => emitter.emit("data", data)} />
      <EncounterAutoTrackerStateful emitter={emitter} />
    </>
  );
};
