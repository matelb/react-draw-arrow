interface SvgProps {
  x: number;
  y: number;
  width: number;
  height: number;
  children?: React.ReactNode;
}

const Svg = ({ x, y, children, width, height }: SvgProps) => {
  return (
    <svg
      width={width}
      height={height}
      style={{
        position: "absolute",
        transform: `translate(${x}px,${y}px)`,
        overflow: "unset",
      }}
    >
      {children}
    </svg>
  );
};

export default Svg;
