import { useState, useCallback } from "react";
import LadderGameSelect from "../components/Select";
import LadderGameCount from "../components/Count";
import "./LadderGame.scss";

const LadderGame = () => {
  const [count, setCount] = useState(2);
  const [isStarted, setIsStarted] = useState(false);

  const editCount = useCallback((n) => {
    setCount(n);
  });

  const setStart = useCallback((bool) => {
    setIsStarted(bool);
  });

  console.log("called LadderGame, Count = ", { count });
  return (
    <>
      <div className="Ambient-Background" />
      <p className="Fixed-Count">개수 입력</p>
      <p className="Fixed-Name">이름 입력</p>
      <p className="Fixed-Result">결과 입력</p>
      <div className="LadderGame-Main">
        <LadderGameCount
          className="LadderGameCount-Main"
          editCount={editCount}
          setStart={setStart}
          isStarted={isStarted}
        />
        <LadderGameSelect
          className="LadderGameSelect-Main"
          count={count}
          setStart={setStart}
          isStarted={isStarted}
        />
      </div>
    </>
  );
};

export default LadderGame;
