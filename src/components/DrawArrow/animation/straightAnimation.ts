import { ComponentProps, DrawArrowPosition } from "../types";
import { AnimateResult } from "./types";

export function getStraightAnimation(
  start: ComponentProps,
  end: ComponentProps,
  offset?: number
): AnimateResult {
  const x = Math.max(Math.abs(start.x), Math.abs(end.x)) / 2;

  const y = Math.max(Math.abs(start.y), Math.abs(end.y)) / 2;

  const cp1x = x + (offset || 60);
  const cp1y = y + (offset || 60);

  // show where the control point is:
  const cp: DrawArrowPosition = {
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
