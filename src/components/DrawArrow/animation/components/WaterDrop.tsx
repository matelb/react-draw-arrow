import { useEffect, useRef, useState } from "react";
import { DEFAULT_COLOR, WATERDROP_ITEM_DELAY, WATERDROP_ITEMS } from "./config";
import { AnimationComponentProps } from "./types";

const WaterDrop = ({
  path,
  duration,
  delay,
  color,
  reverse,
}: AnimationComponentProps) => {
  return (
    <>
      {new Array(WATERDROP_ITEMS).fill(0).map((_, i) => (
        <Drop
          path={path}
          index={i}
          duration={duration}
          delay={delay}
          color={color}
          reverse={reverse}
          key={i}
        />
      ))}
    </>
  );
};

export default WaterDrop;

interface DropProps extends AnimationComponentProps {
  index: number;
}

const Drop = ({ path, duration, delay, color, reverse, index }: DropProps) => {
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
    // <circle r={7 - index * 0.5} fill={running ? backgroundColor : "none"}>
    <circle r={7 - index * 0.4} fill={running ? backgroundColor : "none"}>
      <animateMotion
        dur={duration}
        repeatCount="indefinite"
        path={path}
        keyPoints={reverse ? "1;0" : "0;1"}
        keyTimes="0;1"
        begin={delay + WATERDROP_ITEM_DELAY * index}
        fill={"none"}
        ref={ref}
      />
    </circle>
  );
};
