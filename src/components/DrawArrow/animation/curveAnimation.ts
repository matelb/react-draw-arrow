import { ComponentProps, DrawArrowPosition } from "../types";
import { getOffset } from "../utils";
import { AnimateResult } from "./types";

export function getCurveAnimation(
  start: ComponentProps,
  end: ComponentProps,
  offset?: number
): AnimateResult {
  const mpx = (end.x + start.x) * 0.5;
  const mpy = (end.y + start.y) * 0.5;
  const _offset = offset || getOffset(start, end);

  // angle of perpendicular to line:
  const theta = Math.atan2(end.y - start.y, end.x - start.x) - Math.PI / 2;
  // location of control point:
  const cp1x = mpx + _offset * Math.cos(theta);
  const cp1y = mpy + _offset * Math.sin(theta);

  // show where the control point is:
  const cp: DrawArrowPosition = {
    x: cp1x,
    y: cp1y,
  };
  const path = `M${start.x} ${start.y} Q${cp1x} ${cp1y} ${end.x} ${end.y}`;
  return {
    cp,
    labelPosition: cp,
    path,
  };
}
