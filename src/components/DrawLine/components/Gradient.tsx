import { GradientColor } from "../types";

interface GradientProps {
  id: string;
  duration: number;
  color?: GradientColor;
  animate?: boolean;
}
const Gradient = ({ id, duration, color, animate }: GradientProps) => {
  const primaryColor = color ? color.start : "hsl(230, 55%, 50%)";
  const shadowColor = color ? color.end : "hsl(230, 55%, 70%)";
  // const primaryColor = color ? color.start : "rgba(143, 143, 143, 0.8)";
  // const shadowColor = color ? color.end : "rgba(143, 143, 143, 0.8)";
  return (
    <linearGradient id={id}>
      {animate ? (
        <animateTransform
          attributeName="gradientTransform"
          type="rotate"
          from="0 0.5 0.5"
          to="360 0.5 0.5"
          dur={duration}
          repeatCount="indefinite"
        />
      ) : null}

      <stop stopColor={primaryColor} offset="0"></stop>
      <stop stopColor={shadowColor} offset="1"></stop>
    </linearGradient>
  );
};

export default Gradient;
