import { useId } from "react";
import { AnimationConfigProps } from "../types";

interface AnimationWrapperProps {
  config?: AnimationConfigProps;
  children?: React.ReactNode;
  showStartArrow?: boolean;
  showEndArrow?: boolean;
  markerEndId: string;
  markerStartId: string;
  strokeWidth?: number;
  path?: string;
}

const AnimationWrapper = ({
  config,
  children,
  showEndArrow,
  showStartArrow,
  markerEndId,
  markerStartId,
  strokeWidth,
  path,
}: AnimationWrapperProps) => {
  const blurFilterId = useId();
  return (
    <>
      <defs>
        <filter
          id={blurFilterId}
          filterUnits="objectBoundingBox"
          primitiveUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur
            stdDeviation="4"
            in="SourceGraphic"
            edgeMode="none"
            result="blur"
          ></feGaussianBlur>
        </filter>
      </defs>
      <g filter={config?.blur ? `url(#${blurFilterId})` : undefined}>
        {children}
        <path
          d={path}
          strokeWidth={strokeWidth}
          fill="transparent"
          markerEnd={showEndArrow ? `url(#${markerEndId})` : undefined}
          markerStart={showStartArrow ? `url(#${markerStartId})` : undefined}
        />
      </g>
    </>
  );
};

export default AnimationWrapper;
