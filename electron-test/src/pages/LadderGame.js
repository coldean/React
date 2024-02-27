import { useState, useCallback } from "react";
import LadderGameSelect from "../components/Select";
import LadderGameCount from "../components/Count";
import { useNavigate } from "react-router-dom";

import "./LadderGame.scss";

const LadderGame = () => {
  const [count, setCount] = useState(2);
  const [isStarted, setIsStarted] = useState(false);
  const [look, setLook] = useState(false);
  const navigate = useNavigate();

  const editCount = useCallback((n) => {
    setCount(n);
  });

  const setStart = useCallback((bool) => {
    setIsStarted(bool);
  });

  const goBack = () => {
    navigate("/");
  };

  const lookLadder = useCallback((mouseDown) => {
    if (mouseDown) setLook(true);
    else setLook(false);
    console.log("lookLadder: " + mouseDown);
  }, []);

  console.log("called LadderGame, Count = ", { count });
  return (
    <>
      <div className="Ambient-Background" />
      <p className="Fixed-Count">개수 입력</p>
      <p className="Fixed-Name">이름 입력</p>
      <p className="Fixed-Result">결과 입력</p>
      <button className="Fixed-GoBack" onClick={goBack}>
        메인 화면으로
      </button>
      <button
        className="Fixed-Look"
        onMouseDown={() => lookLadder(true)}
        onMouseUp={() => lookLadder(false)}
      >
        사다리 보기
      </button>
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
          look={look}
        />
      </div>
    </>
  );
};

export default LadderGame;
