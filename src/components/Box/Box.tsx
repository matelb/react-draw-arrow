import styles from "./styles.module.css";
import Draggable, { ControlPosition } from "react-draggable";
import { forwardRef } from "react";

interface BoxProps {
  defaultPosition?: ControlPosition;
  position?: ControlPosition;
  children?: React.ReactNode;
  id?: string;
}

const Box: React.ForwardRefRenderFunction<HTMLDivElement, BoxProps> = (
  // eslint-disable-next-line react/prop-types
  { children, position, defaultPosition, id },
  forwardedRef
) => {
  return (
    <Draggable
      bounds="body"
      defaultPosition={defaultPosition}
      position={position}
    >
      <div id={id} className={styles.box} ref={forwardedRef}>
        <div className={styles.container}>{children}</div>
      </div>
    </Draggable>
  );
};

export default forwardRef(Box);
