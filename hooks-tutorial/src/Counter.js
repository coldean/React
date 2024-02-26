import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  const onClickUp = () => {
    setCount(count + 1);
  };
  const onClickDown = () => {
    setCount(count - 1);
  };

  return (
    <div>
      <p>현재 카운트 값은 {count}</p>
      <button onClick={onClickUp}>+1</button>
      <button onClick={onClickDown}>-1</button>
    </div>
  );
};

export default Counter;
