import { getCurveAnimation } from "./animation/curveAnimation";
import {
  AnimationConfigProps,
  BoxProps,
  ComponentProps,
  DotPosition,
  DrawLinePosition,
  HorizontalPosition,
  VerticalPosition,
} from "./types";
import { getCubicBeizerAnimation } from "./animation/cubicBeizerAnimation";
import { getStraightAnimation } from "./animation/straightAnimation";
import { RefObject } from "react";

interface AnimationProps {
  path: string;
  cp: DrawLinePosition;
  labelPosition: DrawLinePosition;
}

export const initialValues = {
  c1: { cx: 50, cy: 50, r: 4 },
  c2: { cx: 450, cy: 560, r: 4 },
  cp: { cx: 0, cy: 0, r: 4 },
  path: { d: "M0 0" },
};

export const defaultItems = {
  start: {
    x: 25,
    y: 25,
  },
  end: {
    x: 50,
    y: 60,
  },
};
export const clamp = (num: number, min: number, max: number) =>
  Math.min(Math.max(num, min), max);

export function getHorizontalPosition(
  p1: ComponentProps,
  p2: ComponentProps
): HorizontalPosition {
  if (p1.x > p2.x + p2.width) return "right";
  if (p1.x + p1.width < p2.x) return "left";
  return "center";
}

export function getVerticalPosition(p1: number, p2: number): VerticalPosition {
  if (p1 > p2) return "bottom";
  return "top";
}

export function getBoxSize(sBounds: DOMRect, eBounds: DOMRect): BoxProps {
  const width = clamp(
    Math.max(sBounds.x, eBounds.x) -
      Math.min(sBounds.x, eBounds.x) +
      eBounds.width,
    0,
    Math.max(sBounds.x, eBounds.x) + eBounds.width
  );
  return {
    x: window.scrollX + Math.min(sBounds.x, eBounds.x),
    y: window.scrollY + Math.min(sBounds.y, eBounds.y),
    width: width,
    height:
      Math.max(sBounds.y, eBounds.y) -
      Math.min(sBounds.y, eBounds.y) +
      eBounds.height,
  };
}

export function getOffset(start: ComponentProps, end: ComponentProps) {
  // mid-point of line:
  const mpx = (end.x + start.x) * 0.5;
  const mpy = (end.y + start.y) * 0.5;

  const maxmp = Math.min(mpx, mpy);

  if (start.y > end.y) return -maxmp / 2;
  else return maxmp / 2;
}

//calculate the position of the rectangle regarding the position of box1 over box2
export function getDots(sBounds: DOMRect, eBounds: DOMRect): DotPosition {
  if (getVerticalPosition(sBounds.y, eBounds.y) === "bottom") {
    const horizontalPosition = getHorizontalPosition(sBounds, eBounds);
    if (horizontalPosition === "right") {
      return calculateBottomRightPosition(sBounds, eBounds);
    } else if (horizontalPosition === "center") {
      return calculateBottomCenterPosition(sBounds, eBounds);
    } else {
      return calculateBottomLeftPosition(sBounds, eBounds);
    }
  } else {
    const horizontalPosition = getHorizontalPosition(sBounds, eBounds);
    if (horizontalPosition === "right") {
      return calculateTopRightPosition(sBounds, eBounds);
    } else if (horizontalPosition === "center") {
      return calculateTopCenterPosition(sBounds, eBounds);
    } else {
      return calculateTopLeftPosition(sBounds, eBounds);
    }
  }
}

function calculateBottomRightPosition(
  sBounds: DOMRect,
  eBounds: DOMRect
): DotPosition {
  return {
    start: {
      x: sBounds.x - eBounds.x,
      y:
        Math.max(eBounds.y, sBounds.y) -
        Math.min(eBounds.y, sBounds.y) +
        eBounds.height / 2,
      width: sBounds.width,
      height: sBounds.height,
    },
    end: {
      x: eBounds.width,
      y: sBounds.height / 2,
      width: eBounds.width,
      height: eBounds.height,
    },
  };
}

function calculateBottomLeftPosition(
  sBounds: DOMRect,
  eBounds: DOMRect
): DotPosition {
  return {
    start: {
      x: sBounds.width,
      y:
        Math.max(eBounds.y, sBounds.y) -
        Math.min(eBounds.y, sBounds.y) +
        eBounds.height / 2,
      width: sBounds.width,
      height: sBounds.height,
    },
    end: {
      x: eBounds.x - sBounds.x,
      y: eBounds.height / 2,
      width: eBounds.width,
      height: eBounds.height,
    },
  };
}

function calculateBottomCenterPosition(
  sBounds: DOMRect,
  eBounds: DOMRect
): DotPosition {
  return {
    start: {
      x: sBounds.width / 2 + clamp(sBounds.x - eBounds.x, 0, sBounds.x),
      y: Math.max(eBounds.y, sBounds.y) - Math.min(eBounds.y, sBounds.y),
      width: sBounds.width,
      height: sBounds.height,
    },
    end: {
      x: clamp(eBounds.x - sBounds.x, 0, eBounds.x) + eBounds.width / 2,
      y: eBounds.height || 0,
      width: eBounds.width,
      height: eBounds.height,
    },
  };
}

function calculateTopRightPosition(
  sBounds: DOMRect,
  eBounds: DOMRect
): DotPosition {
  return {
    start: {
      x: sBounds.x - eBounds.x,
      y: sBounds.height / 2,
      width: sBounds.width,
      height: sBounds.height,
    },
    end: {
      x: eBounds.width,
      y:
        Math.max(eBounds.y, sBounds.y) -
        Math.min(eBounds.y, sBounds.y) +
        eBounds.height / 2,
      width: eBounds.width,
      height: eBounds.height,
    },
  };
}

function calculateTopCenterPosition(
  sBounds: DOMRect,
  eBounds: DOMRect
): DotPosition {
  return {
    start: {
      x: sBounds.width / 2 + clamp(sBounds.x - eBounds.x, 0, sBounds.x),
      y: sBounds.height,
      width: sBounds.width,
      height: sBounds.height,
    },
    end: {
      x: clamp(eBounds.x - sBounds.x, 0, eBounds.x) + eBounds.width / 2,
      y: Math.max(eBounds.y, sBounds.y) - Math.min(eBounds.y, sBounds.y),
      width: eBounds.width,
      height: eBounds.height,
    },
  };
}

function calculateTopLeftPosition(
  sBounds: DOMRect,
  eBounds: DOMRect
): DotPosition {
  return {
    start: {
      x: sBounds.width,
      y: sBounds.height / 2,
      width: sBounds.width,
      height: sBounds.height,
    },
    end: {
      x: eBounds.x - sBounds.x,
      y:
        Math.max(eBounds.y, sBounds.y) -
        Math.min(eBounds.y, sBounds.y) +
        eBounds.height / 2,
      width: eBounds.width,
      height: eBounds.height,
    },
  };
}

export function getAnimation(
  start: ComponentProps,
  end: ComponentProps,
  animationConfig: AnimationConfigProps
): AnimationProps {
  const { offset, curveStyle } = animationConfig;
  let animation;
  if (curveStyle === "beizer")
    animation = getCubicBeizerAnimation(start, end, offset);
  else if (curveStyle === "curve")
    animation = getCurveAnimation(start, end, offset);
  else animation = getStraightAnimation(start, end);

  return animation;
}

export function getRef(component: RefObject<HTMLElement> | string) {
  if (typeof component === "string") {
    return document.getElementById(component);
  }
  return component.current;
}
export function getRefs(components: RefObject<HTMLElement>[] | string[]) {
  const refs: HTMLElement[] = [];
  components.forEach((component) => {
    if (typeof component === "string") {
      const element = document.getElementById(component);
      if (element) refs.push(element);
    } else {
      if (component.current) refs.push(component.current);
    }
  });

  return refs;
}
