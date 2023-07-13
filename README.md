# react-draw-arrow

Connect components with a simple arrow

### Getting Started

```shell
# Install the library
npm install react-draw-arrow
yarn add react-draw-arrow
```

```jsx
import { DrawArrow, WaterDrop } from "react-draw-arrow";

const App = () => {
  const box1 = useRef<HTMLDivElement>(null);
  const box2 = useRef<HTMLDivElement>(null);
  return (
    <>
      <div ref={box1} />
      <div ref={box2} />
      <DrawArrow
        mainComponent={box1}
        childComponents={[box2]}
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
```

### Examples

- https://codesandbox.io/s/suspicious-butterfly-x6hk2g
- https://codesandbox.io/s/lucid-dijkstra-dn8qpq



### Simple use case

```jsx
import { DrawArrow, WaterDrop } from "react-draw-arrow";

const App = () => {
  const box1 = useRef<HTMLDivElement>(null);
  const box2 = useRef<HTMLDivElement>(null);
  return (
    <>
      <div ref={box1} />
      <div ref={box2} />
      <DrawArrow
        mainComponent={box1}
        childComponents={[box2]}
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
```

### Using react-draggable

```jsx
import { DrawArrow, WaterDrop } from "react-draw-arrow";
import Draggable from "react-draggable";

const App = () => {
  const box1 = useRef<HTMLDivElement>(null);
  const box2 = useRef<HTMLDivElement>(null);
  return (
    <>
       <Draggable
          bounds="body"
          position={{x: 100, y: 50}}
        >
          <div ref={box1}>
            Box 1
          </div>
        </Draggable>
       <Draggable
          bounds="body"
          position={{x: 300, y: 600}}
        >
          <div ref={box2}>
            Box 2
          </div>
        </Draggable>
      <DrawArrow
        mainComponent={box1}
        childComponents={[box2]}
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
```



### Animation components

- Circle
- WaterDrop

#### Circle

```jsx
import { DrawArrow, Circle } from "react-draw-arrow";

const App = () => {
  const box1 = useRef<HTMLDivElement>(null);
  const box2 = useRef<HTMLDivElement>(null);
  return (
    <>
      <div ref={box1} />
      <div ref={box2} />
      <DrawArrow
        mainComponent={box1}
        childComponents={[box2]}
        pathConfig={{ blur: true }}
        animate
        animationConfig={{
          delay: 1,
          duration: 3,
          nItems: 3,
          curveStyle: "beizer",
          blur: true,
        }}
        animationInput={(props) => <Circle {...props} />}
      />
    </>
  );
};
```

#### WaterDrop

```jsx
import { DrawArrow, WaterDrop } from "react-draw-arrow";

const App = () => {
  const box1 = useRef<HTMLDivElement>(null);
  const box2 = useRef<HTMLDivElement>(null);
  return (
    <>
      <div ref={box1} />
      <div ref={box2} />
      <DrawArrow
        mainComponent={box1}
        childComponents={[box2]}
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
```

#### Custom animation component

Animation components are embedded inside "g" svg component.

```jsx
const DEFAULT_COLOR = "black";

const AnimationComponent = ({
  path,
  duration,
  delay,
  color,
  reverse,
}: AnimationComponentProps) => {
  const [running, setRunning] = useState<boolean>(false);
  const ref = useRef<SVGElement>(null);
  const backgroundColor = color ? color : DEFAULT_COLOR;

  function toggleRunning(isRunnging: boolean) {
    setRunning(isRunnging);
  }

  useEffect(() => {
    const animationRef = ref.current;
    if (animationRef) {
      animationRef.addEventListener("beginEvent", () => toggleRunning(true));
      animationRef.addEventListener("endEvent", () => toggleRunning(false));
    }
    return () => {
      if (animationRef) {
        animationRef.removeEventListener("beginEvent", () =>
          toggleRunning(true)
        );
        animationRef.removeEventListener("beginEvent", () =>
          toggleRunning(false)
        );
      }
    };
  }, []);
  return (
       <circle r={8} fill={running ? backgroundColor : "none"}>
        <animateMotion
          dur={duration}
          repeatCount="indefinite"
          path={path}
          keyPoints={reverse ? "1;0" : "0;1"}
          keyTimes="0;1"
          begin={delay}
          ref={ref}
          offset={-100}
          startOffset={-100}
        />
      </circle>
      />
  );
};
```

## Props

| Property             | Description                                              | Type                                                                             |
| -------------------- | -------------------------------------------------------- | -------------------------------------------------------------------------------- |
| mainComponent?       | Main component                                           | RefObject<HTMLElement> or string                                                 |
| childComponents?     | Child components                                         | RefObject<HTMLElement>[] or string[]                                             |
| animate?             | Animate arrow                                            | boolean                                                                          |
| showDots?            | Show control position,start point and end point af arrow | boolean                                                                          |
| showStartArrow?      | Show start arrow marker                                  | boolean                                                                          |
| showEndArrow?        | Show end arrow marker                                    | boolean                                                                          |
| label?               | Label                                                    | string                                                                           |
| animationInput?      | Input of animation component                             | (props: [AnimationComponentProps](#animationComponentProps) ) => React.ReactNode |
| labelInput?          | Input of label component                                 | React.ReactNode                                                                  |
| animationConfig?     | Animation configuration                                  | [AnimationConfigProps](#animationConfigProps)                                    |
| pathConfig?          | Path configuration                                       | [PathConfigProps](#pathConfigProps)                                              |
| markerConfiguration? | Marker configuration                                     | [MarkerConfigProps](#markerConfigProps)                                          |

## AnimationConfigProps

<a name="animationConfigProps"></a>
| Property | Description | Type |
| ------------- | ------------- | ------------- |
| duration? | Duration of animation |number
| delay? | Delay of animation |number
| nItems? | Number of animation items | number
| nItems? | Number of animation items | number
| reverse? |Animation reverse mode | number
| curveStyle? | Curve style of arrow | number
| blur? | Blur mode | boolean
| offset? | Offset of control point regarding curve (defualt 60) | "beizer" -"straight" - "curve"
| color? | Animation color | string

## AnimationComponentProps

<a name="animationComponentProps"></a>
| Property | Description | Type |
| ------------- | ------------- | ------------- |
| duration? | Duration of animation |number
| delay? | Delay of animation |number
| path? | Path of animation | string
| reverse? |Animation reverse mode | number
| color? | Animation color | string

## PathConfigProps

<a name="pathConfigProps"></a>
| Property | Description | Type |
| ------------- | ------------- | ------------- |
| strokeWidth? | Width of arrow (defualt 3) |number
| isStrokeArray? | If arrow is dashed |boolean
| blur? | Blur mode in path | boolean
| color? | Path color, this case could be gradient | [GradientColor](#gradientColor)

## MarkerConfigProps

<a name="markerConfigProps"></a>
| Property | Description | Type |
| ------------- | ------------- | ------------- |
| scale? | Scale of marker | number
| color? | Marker color (default #f00) | string

## GradientColor

<a name="gradientColor"></a>
| Property | Description | Type |
| ------------- | ------------- | ------------- |
| start? | Start color | string
| end? | End color | string
