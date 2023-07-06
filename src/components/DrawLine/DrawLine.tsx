import {
  RefObject,
  useEffect,
  useRef,
  useState,
  useId,
  Fragment,
  memo,
  useCallback,
} from "react";
import { getBoxSize, getDots, getAnimation, getRef, getRefs } from "./utils";
import Dots from "./components/Dots";
import { Label, Path, Svg } from "./components";
import {
  AnimationConfigProps,
  BoxProps,
  DotPosition,
  PathConfigProps,
  PathProps,
  DrawLinePosition,
  MarkerConfigProps,
} from "./types";
import { AnimationComponentProps } from "./animation/components/types";
import { AnimationWrapper } from "./animation";

interface DrawLineProps {
  animationConfig?: AnimationConfigProps;
  pathConfig?: PathConfigProps;
  mainComponent: RefObject<HTMLElement> | string;
  childrens: RefObject<HTMLElement>[] | string[];
  animate?: boolean;
  showDots?: boolean;
  animationInput?: (props: AnimationComponentProps) => React.ReactNode;
  showStartArrow?: boolean;
  showEndArrow?: boolean;
  markerConfiguration?: MarkerConfigProps;
  label?: string;
  labelInput?: React.ReactNode;
}

interface Item {
  cp: DrawLinePosition;
  labelPosition: DrawLinePosition;
  path: PathProps;
  box: BoxProps;
  dots: DotPosition;
}

const DrawLine = ({
  animationConfig = {
    duration: 3,
    delay: 1,
    nItems: 3,
    reverse: false,
    curveStyle: "straight",
    blur: false,
  },
  pathConfig = {
    strokeWidth: 3,
    isStrokeArray: false,
    blur: false,
  },
  mainComponent,
  childrens,
  animate = false,
  showDots,
  animationInput,
  showEndArrow,
  showStartArrow,
  markerConfiguration,
  label,
  labelInput,
}: DrawLineProps): JSX.Element => {
  const gradientId = useId();
  const markerStartId = useId();
  const markerEndId = useId();
  const startBounds = useRef<DOMRect>();
  const childrenBounds = useRef<DOMRect[]>([]);
  const [items, setItems] = useState<Item[]>([]);

  const execute = useCallback(
    (sBounds: DOMRect, cBounds: DOMRect[]) => {
      startBounds.current = sBounds;
      childrenBounds.current = cBounds;
      const items: Item[] = [];

      cBounds.forEach((eBounds) => {
        const box = getBoxSize(sBounds, eBounds);
        const dots = getDots(sBounds, eBounds);
        const { path, cp, labelPosition } = getAnimation(
          dots.start,
          dots.end,
          animationConfig
        );

        items.push({
          box,
          dots,
          cp,
          labelPosition,
          path: { d: path },
        });
      });
      setItems(items);
    },
    [animationConfig]
  );

  const getBounds = useCallback(() => {
    const mainRef = getRef(mainComponent);
    const childrenRefs = getRefs(childrens);
    if (mainRef && childrenRefs) {
      const startBounds = mainRef.getBoundingClientRect();
      if (startBounds) {
        const cBounds: DOMRect[] = [];
        childrenRefs.forEach((child) => {
          if (child) {
            const childRect = child.getBoundingClientRect();
            if (childRect) cBounds.push(childRect);
          }
        });
        execute(startBounds, cBounds);
      }
    }
  }, [mainComponent, childrens, execute]);

  useEffect(() => {
    const observer = new MutationObserver(getBounds);
    const mainRef = getRef(mainComponent);
    const childrenRefs = getRefs(childrens);
    if (mainRef && childrens) {
      const observeProps: MutationObserverInit = {
        attributes: true,
        characterData: false,
        childList: false,
        subtree: false,
      };

      observer.observe(mainRef, observeProps);
      childrenRefs.forEach((child) => {
        if (child) observer.observe(child, observeProps);
      });
      getBounds();
    }
    return () => {
      observer.disconnect();
    };
  }, [mainComponent, childrens, getBounds]);

  return (
    <>
      {items.map((item, i) => {
        const { box, dots, path, cp, labelPosition } = item;
        return (
          <Fragment key={i}>
            <Svg x={box.x} y={box.y} width={box.width} height={box.height}>
              <Path
                animate={animate}
                d={path.d}
                config={pathConfig}
                reverse={animationConfig.reverse}
                gradientId={gradientId}
                showEndArrow={showEndArrow}
                showStartArrow={showStartArrow}
                markerEndId={markerEndId}
                markerStartId={markerStartId}
                markerConfiguration={markerConfiguration}
              />
              {showDots ? <Dots dots={dots} cp={cp} /> : null}
              {animate ? (
                <>
                  {animationInput ? (
                    <AnimationWrapper
                      config={animationConfig}
                      path={path.d}
                      strokeWidth={pathConfig.strokeWidth}
                      showEndArrow={showEndArrow}
                      showStartArrow={showStartArrow}
                      markerEndId={markerEndId}
                      markerStartId={markerStartId}
                    >
                      {new Array(animationConfig.nItems).fill(0).map((_, i) => (
                        <Fragment key={i}>
                          {animationInput({
                            path: path.d,
                            delay: (animationConfig.delay || 1) * i,
                            duration: animationConfig.duration || 1,
                            color: animationConfig?.color,
                            reverse: animationConfig.reverse,
                          })}
                        </Fragment>
                      ))}
                    </AnimationWrapper>
                  ) : undefined}
                </>
              ) : null}
            </Svg>
            {label || labelInput ? (
              <Label
                x={labelPosition.x}
                y={labelPosition.y}
                containerHeight={box.width}
                containerWidth={box.width}
                containerX={box.x}
                containerY={box.y}
                labelInput={labelInput}
                label={label}
              />
            ) : null}
          </Fragment>
        );
      })}
    </>
  );
};

export default memo(DrawLine);
