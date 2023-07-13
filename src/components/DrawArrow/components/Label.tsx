import styles from "./styles.module.css";
interface LabelProps {
  x: number;
  y: number;
  containerWidth: number;
  containerHeight: number;
  containerX: number;
  containerY: number;
  labelInput?: React.ReactNode;
  label?: string;
}

const Label = ({
  x,
  y,
  containerWidth,
  containerHeight,
  containerX,
  containerY,
  labelInput,
  label,
}: LabelProps) => {
  return (
    <div
      style={{
        position: "absolute",
        width: containerWidth,
        height: containerHeight,
        transform: `translate(${containerX}px,${containerY}px)`,
      }}
    >
      <div
        style={{
          position: "absolute",
          transform: `translate(${x}px,${y}px)`,
        }}
      >
        {labelInput ? labelInput : <div className={styles.label}>{label}</div>}
      </div>
    </div>
  );
};

export default Label;
