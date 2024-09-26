import React, { useEffect, useRef, useState } from "react";
import "./Stopwatch.css";

function Stopwatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [ispaused, setisPaused] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning && !ispaused) {
      intervalRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 10);
    }
    return () => {
      clearInterval(intervalRef.current);
    };

  }, [isRunning, ispaused]);
  function start() {
    setElapsedTime(0);
    setIsRunning(true);
    setisPaused(false);
    startTimeRef.current = Date.now();
  }
  function pause() {
    setisPaused(true);
    clearInterval(intervalRef.current);
  }

  function stop() {
    setIsRunning(false);
    setisPaused(false);
    clearInterval(intervalRef.current)
  }

  function reset() {
    setElapsedTime(0);
    setIsRunning(false);
    setisPaused(false);
    clearInterval(intervalRef.current)
  }

  function formatTime() {
    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    let seconds = Math.floor((elapsedTime / 1000) % 60);
    let miliseconds = Math.floor((elapsedTime % 1000) / 10);

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    miliseconds = String(miliseconds).padStart(2, "0");

    return `${hours}:${minutes}:${seconds}.${miliseconds}`;
  }

  return (
    <div className="stopwatch">
      <h1>Stopwatch-App</h1>
      <div className="display">{formatTime()}</div>
      <div className="buttons">
        {!isRunning || ispaused ? (
          (
            <button onClick={start} className="startbtn">
              Start
            </button>
          )
        ) : (
          <button onClick={pause} className="pausebtn">
            Pause
          </button>
        )}

        <button onClick={stop} className="stoptbtn">
          Stop
        </button>
        <button onClick={reset} className="resetbtn">
          Reset
        </button>
      </div>
    </div>
  );
}

export default Stopwatch;