import { ComponentProps, DrawLinePosition } from "../types";
import { getOffset } from "../utils";
import { AnimateResult } from "./types";

export function getStraightAnimation(
  start: ComponentProps,
  end: ComponentProps
): AnimateResult {
  const mpx = (end.x + start.x) * 0.5;
  const mpy = (end.y + start.y) * 0.5;
  const offset = getOffset(start, end);

  // angle of perpendicular to line:
  const theta = Math.atan2(end.y - start.y, end.x - start.x) - Math.PI / 2;
  // location of control point:
  const cp1x = mpx + offset * Math.cos(theta);
  const cp1y = mpy + offset * Math.sin(theta);

  // show where the control point is:
  const cp: DrawLinePosition = {
    x: cp1x,
    y: cp1y,
  };
  const path = `M${start.x} ${start.y} ${end.x} ${end.y}`;
  return {
    cp,
    labelPosition: cp,
    path,
  };
}
