import { useState, useEffect } from "react";
import { useStopwatch } from "react-timer-hook";

type DrinkReminderProps = {
  shouldStart: boolean;
  shouldRestart: boolean;
};

export default function DrinkReminder({
  shouldStart,
  shouldRestart,
}: DrinkReminderProps) {
  const DEFAULT_TIME = 60;
  const [durationInMinute, setDurationInMinute] =
    useState<number>(DEFAULT_TIME);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const { minutes, hours, seconds, isRunning, start, pause, reset } =
    useStopwatch({
      autoStart: false,
    });

  // Timer control from stopwatch
  useEffect(() => {
    if (shouldStart) start();
    else pause();
  }, [shouldStart, pause, start]);

  useEffect(() => {
    if (shouldRestart) reset(undefined, false);
  }, [shouldRestart, reset]);

  // Reset timer
  useEffect(() => {
    if (hours * 60 + minutes >= durationInMinute) {
      if (!isMuted) {
        const audio = new Audio("water-break.mp3");
        audio.play();
      }
      reset(undefined, true);
    }
  }, [minutes, hours, seconds, durationInMinute, isMuted, reset]);

  return (
    <div className="drink-reminder container">
      <div className="content">
        <button className="mute-button" onClick={() => setIsMuted(!isMuted)}>
          {isMuted ? "🔇" : "🔊"}
        </button>
        <h2>Water Break</h2>
        <div className="water-glass">
          <div
            className="water"
            style={{
              height: `${
                ((durationInMinute * 60 -
                  (hours * 3600 + minutes * 60 + seconds)) /
                  (durationInMinute * 60)) *
                100
              }%`,
            }}
          ></div>
        </div>
        <input
          type="number"
          min="0"
          max="1440"
          value={durationInMinute}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            if (!isNaN(value) && value > 0 && value <= 1440) {
              setDurationInMinute(value);
              if (isRunning) {
                reset(undefined, true);
              } else {
                reset(undefined, false);
              }
            }
          }}
        />
      </div>
    </div>
  );
}
