import { MarkerConfigProps, PathConfigProps } from "../types";
import Gradient from "./Gradient";
import styles from "./styles.module.css";
import cn from "classnames";

interface PathProps {
  animate: boolean;
  gradientId: string;
  reverse?: boolean;
  config?: PathConfigProps;
  d: string;
  showStartArrow?: boolean;
  showEndArrow?: boolean;
  markerEndId: string;
  markerStartId: string;
  markerConfiguration?: MarkerConfigProps;
}

const Path = ({
  animate,
  gradientId,
  config,
  reverse,
  d,
  showEndArrow,
  showStartArrow,
  markerEndId,
  markerStartId,
  markerConfiguration,
}: PathProps) => {
  const arrowScale = markerConfiguration?.scale || 1;
  return (
    <>
      <defs>
        <Gradient
          id={gradientId}
          duration={5}
          color={config?.color}
          animate={animate}
        />
        <filter
          id="neon-filter"
          filterUnits="objectBoundingBox"
          primitiveUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur
            stdDeviation="2 2"
            in="SourceGraphic"
            edgeMode="none"
            result="blur"
          ></feGaussianBlur>
        </filter>
        <filter
          id="neon-filter2"
          filterUnits="objectBoundingBox"
          primitiveUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur
            stdDeviation="3 3"
            in="SourceGraphic"
            edgeMode="none"
            result="blur"
          ></feGaussianBlur>
        </filter>
        <marker
          refX={10 * arrowScale}
          refY={5 * arrowScale}
          markerUnits="strokeWidth"
          markerWidth="1000"
          markerHeight="1000"
          orient="auto-start-reverse"
          id={markerStartId}
        >
          <path
            d={`M 0 0 L ${10 * arrowScale} ${5 * arrowScale} L 0 ${
              10 * arrowScale
            } L ${2.5 * arrowScale} ${5 * arrowScale} z`}
            fill={markerConfiguration?.color || "#f00"}
          />
        </marker>
        <marker
          refX={10 * arrowScale}
          refY={5 * arrowScale}
          markerUnits="strokeWidth"
          markerWidth="1000"
          markerHeight="1000"
          orient="auto-start-reverse"
          id={markerEndId}
        >
          <path
            d={`M 0 0 L ${10 * arrowScale} ${5 * arrowScale} L 0 ${
              10 * arrowScale
            } L ${2.5 * arrowScale} ${5 * arrowScale} z`}
            fill={markerConfiguration?.color || "#f00"}
          />
        </marker>
      </defs>
      <g
        strokeWidth={config?.strokeWidth || 3}
        stroke={`url('#${gradientId}')`}
        fill="none"
        strokeLinecap="round"
        className={cn(
          { [styles.stroke]: config?.isStrokeArray },
          { [styles.animate]: animate },
          { [styles.reverse]: animate && reverse }
        )}
      >
        {config?.blur ? (
          <>
            <path d={d} filter="url(#neon-filter)"></path>
            <path d={d} filter="url(#neon-filter2)"></path>
          </>
        ) : null}
        <path
          d={d}
          stroke={`url('#${gradientId}')`}
          markerEnd={showEndArrow ? `url(#${markerEndId})` : undefined}
          markerStart={showStartArrow ? `url(#${markerStartId})` : undefined}
        ></path>
      </g>
    </>
  );
};

export default Path;
