import { useState, useCallback } from "react";
import LadderGameSelect from "../components/Select";
import LadderGameCount from "../components/Count";
import { useNavigate, useLocation } from "react-router-dom";

import "./LadderGame.scss";

const LadderGame = () => {
  const [look, setLook] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const gameInfo = { ...location.state };

  const [count, setCount] = useState(gameInfo.count);
  const [isStarted, setIsStarted] = useState(gameInfo.isStarted);
  const [inputs, setInputs] = useState(gameInfo.inputs); // 이름들 input

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

  //console.log("called LadderGame, Count = ", { gameInfo.count });
  return (
    <>
      <div className="Ambient-Background" />
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
        {/*}
        <LadderGameCount
          className="LadderGameCount-Main"
          editCount={editCount}
          setStart={setStart}
          isStarted={isStarted}
        />
  */}
        <LadderGameSelect
          className="LadderGameSelect-Main"
          count={count}
          setStart={setStart}
          isStarted={isStarted}
          look={look}
          names={inputs}
        />
      </div>
    </>
  );
};

export default LadderGame;
