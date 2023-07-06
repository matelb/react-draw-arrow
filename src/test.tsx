import { useRef } from "react";
import DrawLine from "./components/DrawLine";
import { WaterDrop } from "./components/DrawLine/animation/components";

const App = () => {
  const box1 = useRef<HTMLDivElement>(null);
  const box2 = useRef<HTMLDivElement>(null);
  return (
    <>
      <div ref={box1} />
      <div ref={box2} />
      <DrawLine
        mainComponent={box1}
        childrens={[box2]}
        pathConfig={{ blur: true }}
        animate
        animationConfig={{
          delay: 1,
          duration: 3,
          nItems: 3,
          curveStyle: "beizer",
          blur: true,
        }}
        animationInput={(props) => <WaterDrop {...props} />}
      />
    </>
  );
};

export default App;
