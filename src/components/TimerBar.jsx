import { useState, useEffect, useRef } from "react";

export function useCountdown(totalSeconds, onTimeUp) {
  const [timeLeft, setTimeLeft] = useState(totalSeconds);
  const startTimeRef = useRef(Date.now());
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
      const remaining = totalSeconds - elapsed;

      if (remaining <= 0) {
        setTimeLeft(0);
        clearInterval(intervalRef.current);
        onTimeUp();
      } else {
        setTimeLeft(remaining);
      }
    }, 250); // update frequently to prevent skipping

    return () => clearInterval(intervalRef.current);
  }, [totalSeconds, onTimeUp]);

  return timeLeft;
}
