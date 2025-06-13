import { useState } from "react";
import "./App.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import BackgroundColor from "./backgroundColor";
import ToDo from "./ToDo";
import MyStopwatch from "./MyStopwatch";
import DrinkReminder from "./DrinkReminder";
import YouTubePlayer from "./YouTube";

function App() {
  const [runningStopwatch, setRunningStopwatch] = useState<boolean>(false);
  const [restarted, setRestarted] = useState<boolean>(false);

  return (
    <div
      className="app-content"
      style={{
        backgroundColor: BackgroundColor(),
        transition: "background-color 10s linear",
        height: "100vh",
        overflowX: "auto",
      }}
    >
      <ToDo />
      <MyStopwatch
        onRunningChange={setRunningStopwatch}
        onRestart={setRestarted}
      />
      <DrinkReminder shouldStart={runningStopwatch} shouldRestart={restarted} />
      <YouTubePlayer />
    </div>
  );
}

export default App;
