export interface CircleProps {
  cx: number;
  cy: number;
  r: number;
}
export interface PathProps {
  d: string;
}

export interface DrawLinePosition {
  x: number;
  y: number;
}

export interface ComponentProps {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface DotPosition {
  start: ComponentProps;
  end: ComponentProps;
}

export interface BoxProps {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface MarkerConfigProps {
  color?: string;
  scale?: number;
}

export interface GradientColor {
  start: string;
  end: string;
}

export interface AnimationConfigProps {
  duration?: number;
  delay?: number;
  nItems?: number;
  reverse?: boolean;
  curveStyle: CurveStyle;
  blur: boolean;
  offset?: number;
  color?: string;
}

export interface PathConfigProps {
  strokeWidth?: number;
  isStrokeArray?: boolean;
  blur?: boolean;
  color?: GradientColor;
}

export type CurveStyle = "beizer" | "straight" | "curve";

export type HorizontalPosition = "left" | "right" | "center";
export type VerticalPosition = "top" | "bottom";
