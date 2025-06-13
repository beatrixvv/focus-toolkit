import { useEffect, useState } from "react";
import chroma from "chroma-js";

type TimeColor = {
  time: number; 
  color: string;
};

const skyGradient: TimeColor[] = [
    { time: 0, color: "#5f6182d3" }, 
    { time: 6, color: "#f7f7d7" },
    { time: 10, color: "#fbe582c9" },
    { time: 14, color: "#fbc486bb" }, 
    { time: 17, color: "#aa93adc9" },
    { time: 20, color: "#697e9abe" }, 
    { time: 24, color: "#5f6182d3" },
];

export default function BackgroundColor(): string {
  const [color, setColor] = useState<string>("#f7f7d7");

  useEffect(() => {
    function getCurrentHour(): number {
      const now = new Date();
      return now.getHours() + now.getMinutes() / 60;
    }

    function getBlendedColor(hour: number): string {
      for (let i = 0; i < skyGradient.length - 1; i++) {
        const start = skyGradient[i];
        const end = skyGradient[i + 1];

        if (hour >= start.time && hour < end.time) {
          const t = (hour - start.time) / (end.time - start.time);
          return chroma.mix(start.color, end.color, t).hex();
        }
      }
      return "#f7f7d7";
    }

    function update() {
      const newColor = getBlendedColor(getCurrentHour());
      setColor(newColor);
    }

    // Update every 5 minutes
    update();
    const interval = setInterval(update, 60 * 5 * 1000); 
    return () => clearInterval(interval);
    
  }, []);
  return color;
}

