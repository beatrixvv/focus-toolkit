import { useState, useEffect } from "react";
import { useStopwatch } from "react-timer-hook";

type MyStopwatchProps = {
  onRunningChange: (isRunning: boolean) => void;
  onRestart: (isRestarted: boolean) => void;
};

export default function MyStopwatch({
  onRunningChange,
  onRestart,
}: MyStopwatchProps) {
  const { minutes, hours, seconds, isRunning, start, pause, reset } =
    useStopwatch({
      autoStart: false,
    });

  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [showSeconds, setShowSeconds] = useState<boolean>(false);
  const [isRestarted, setIsRestarted] = useState<boolean>(false);
  const padded = (n: number) => String(n).padStart(2, "0");

  useEffect(() => {
    onRunningChange(isRunning);
  }, [isRunning, onRunningChange]);

  useEffect(() => {
    onRestart(isRestarted);
  }, [isRestarted, onRestart]);

  return (
    <div className="stopwatch container">
      <div className="content">
        <div className="message">
          <span>
            {!hasStarted
              ? "Ready?"
              : isRunning
              ? "You got this!"
              : "Well done!"}
          </span>
        </div>
        <div className="time" onClick={() => setShowSeconds(!showSeconds)}>
          <span>{padded(hours)}</span>
          <span>:</span>
          <span>{padded(minutes)}</span>
          <span>{showSeconds ? ": " + padded(seconds) : null}</span>
        </div>
        <div className="controls">
          <button
            onClick={() => {
              start();
              setHasStarted(true);
              setIsRestarted(false);
            }}
          >
            <i className="bi bi-play-fill"></i>
          </button>
          <button onClick={() => pause()}>
            <i className="bi bi-pause-fill"></i>
          </button>
          <button
            onClick={() => {
              reset(undefined, false);
              setHasStarted(false);
              setIsRestarted(true);
            }}
          >
            <i className="bi bi-arrow-clockwise"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
