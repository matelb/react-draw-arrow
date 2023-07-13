import { useEffect, useRef, useState } from "react";
import { DEFAULT_COLOR } from "./config";
import { AnimationComponentProps } from "./types";

const Circle = ({
  path,
  duration,
  delay,
  color,
  reverse,
}: AnimationComponentProps) => {
  const [running, setRunning] = useState<boolean>(false);
  const ref = useRef<SVGElement>(null);
  const backgroundColor = color ? color : DEFAULT_COLOR;

  function toggleRunning(isRunnging: boolean) {
    setRunning(isRunnging);
  }

  useEffect(() => {
    const animationRef = ref.current;
    if (animationRef) {
      animationRef.addEventListener("beginEvent", () => toggleRunning(true));
      animationRef.addEventListener("endEvent", () => toggleRunning(false));
    }
    return () => {
      if (animationRef) {
        animationRef.removeEventListener("beginEvent", () =>
          toggleRunning(true)
        );
        animationRef.removeEventListener("beginEvent", () =>
          toggleRunning(false)
        );
      }
    };
  }, []);

  return (
    <>
      <circle r={8} fill={running ? backgroundColor : "none"}>
        <animateMotion
          dur={duration}
          repeatCount="indefinite"
          path={path}
          keyPoints={reverse ? "1;0" : "0;1"}
          keyTimes="0;1"
          begin={delay}
          ref={ref}
          offset={-100}
          startOffset={-100}
        />
      </circle>
    </>
  );
};

export default Circle;
