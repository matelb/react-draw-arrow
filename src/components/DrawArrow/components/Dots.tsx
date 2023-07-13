import styles from "./styles.module.css";
import { DrawArrowPosition } from "../types";

export interface DotColor {
  color: string;
}

interface DotsProps {
  dots: {
    start: DrawArrowPosition;
    end: DrawArrowPosition;
  };
  cp?: DrawArrowPosition;
}

const Dots = ({ dots, cp }: DotsProps) => {
  return (
    <>
      <g>
        <circle
          cx={dots.start.x}
          cy={dots.start.y}
          r={4}
          className={styles.dot}
        ></circle>
        <circle
          className={styles.dot}
          cx={dots.end.x}
          cy={dots.end.y}
          r={4}
        ></circle>
        {cp ? (
          <circle
            id="cp"
            className={styles.cp}
            cx={cp.x}
            cy={cp.y}
            r={4}
          ></circle>
        ) : null}
      </g>
    </>
  );
};

export default Dots;
