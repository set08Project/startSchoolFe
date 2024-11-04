import React, { useState, useEffect } from "react";

interface CountdownTimerProps {
  initialSeconds: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ initialSeconds }) => {
  const [seconds, setSeconds] = useState<number>(() => {
    const savedSeconds = localStorage.getItem("countdown");
    return savedSeconds ? Number(savedSeconds) : initialSeconds;
  });

  useEffect(() => {
    if (seconds > 0) {
      const timerId: NodeJS.Timeout = setInterval(() => {
        setSeconds((prevSeconds) => {
          const newSeconds = prevSeconds - 1;
          localStorage.setItem("countdown", newSeconds.toString());
          clearInterval(timerId);
          return newSeconds >= 0 ? newSeconds : 0;
        });
      }, 1000);
    } else {
      localStorage.removeItem("countdown");
    }
  }, [seconds]);

  const formatTime = (secs: number): string => {
    const hours = Math.floor(secs / 3600);
    const minutes = Math.floor((secs % 3600) / 60);
    const remainingSeconds = secs % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(remainingSeconds).padStart(2, "0")}`;
  };

  const getColor = () => {
    if (seconds > 30) return "text-green-500";
    if (seconds > 10) return "text-yellow-500";
    return "text-red-500 animate-pulse";
  };

  const getProgressBarColor = () => {
    if (seconds > 30) return "stroke-green-500";
    if (seconds > 10) return "stroke-yellow-500";
    return "stroke-red-500 animate-pulse";
  };

  return (
    <div className="flex items-center gap-3">
      <div className={`text-[30px] font-bold ${getColor()}`}>
        {formatTime(seconds)}
      </div>

      {/* Animated circular progress bar */}
      <div>
        <svg
          className="w-[50px] h-[80px] transition-all duration-300 transform -rotate-90"
          viewBox="0 0 36 36"
        >
          <circle
            cx="18"
            cy="18"
            r="15.5"
            fill="none"
            stroke="#e0e0e0"
            strokeWidth="3"
          />
          <circle
            cx="18"
            cy="18"
            r="15.5"
            fill="none"
            strokeWidth="3"
            strokeLinecap="round"
            className={`${getProgressBarColor()}`}
            strokeDasharray="100"
            strokeDashoffset={100 - (seconds / initialSeconds) * 100}
          />
        </svg>
      </div>
    </div>
  );
};

export default CountdownTimer;
