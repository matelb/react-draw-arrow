import { ComponentProps, DrawArrowPosition } from "../types";
import { getHorizontalPosition, getVerticalPosition } from "../utils";
import { AnimateResult } from "./types";

export function getCubicBeizerAnimation(
  start: ComponentProps,
  end: ComponentProps,
  offset?: number
): AnimateResult {
  checkPositions(start, end);
  const length = end.x - start.x;
  const middleX = length / 2 + start.x;
  const middleY = getMiddlePoint(start, end, middleX);
  const middlePoint: DrawArrowPosition = {
    x: middleX,
    y: middleY,
  };
  const _offset = offset || 60;
  const cp = getControlPoint(
    start,
    middlePoint,
    invertOffset(start, end) ? -_offset : _offset
  );

  const labelPosition = getControlPoint(
    start,
    end,
    invertOffset(start, end) ? -(_offset / 2) : _offset / 2
  );

  const path = `M ${start.x} ${start.y}, Q ${cp.x} ${cp.y}, ${middlePoint.x} ${middlePoint.y} T ${end.x},${end.y}`;
  return {
    cp: cp,
    labelPosition: labelPosition,
    path: path,
  };
}

function checkPositions(start: ComponentProps, end: ComponentProps) {
  if (start.x === end.x) start.x = start.x + 1;
  if (start.y === end.y) start.y = start.y + 1;
}

function invertOffset(start: ComponentProps, end: ComponentProps) {
  const horizontalPosition = getHorizontalPosition(start, end);
  const verticalPosition = getVerticalPosition(start.y, end.y);
  if (verticalPosition === "bottom" && horizontalPosition === "left")
    return true;
  if (verticalPosition === "top" && horizontalPosition === "right") return true;
  return false;
}

function getMiddlePoint(
  pointA: DrawArrowPosition,
  pointB: DrawArrowPosition,
  currentValue: number
) {
  const m = (pointB.y - pointA.y) / (pointB.x - pointA.x);
  const c = (pointB.x * pointA.y - pointA.x * pointB.y) / (pointB.x - pointA.x);
  const y = m * currentValue + c;
  return y;
}

function getControlPoint(
  start: DrawArrowPosition,
  end: DrawArrowPosition,
  offset: number
): DrawArrowPosition {
  const mpx = (end.x + start.x) * 0.5;
  const mpy = (end.y + start.y) * 0.5;

  let x = end.x - start.x;
  x = x || 1;
  let y = end.y - start.y;
  y = y || 1;

  // angle of perpendicular to line:
  const theta = Math.atan2(y || 1, x || 1) - Math.PI / 2;
  if (!theta) {
    return {
      x: mpx || 0,
      y: mpy || 0,
    };
  }
  // location of control point:
  const cpx = mpx + offset * Math.cos(theta);
  const cpy = mpy + offset * Math.sin(theta);

  // show where the control point is:
  return {
    x: cpx,
    y: cpy,
  };
}
