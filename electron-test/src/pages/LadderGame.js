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

  const refresh = () => {
    window.location.reload();
  };

  const lookLadder = useCallback((mouseDown) => {
    if (mouseDown) setLook(true);
    else setLook(false);
    console.log("lookLadder: " + mouseDown);
  }, []);

  return (
    <>
      <div className="Ambient-Background" />

      <button className="Fixed-GoBack" onClick={goBack}>
        메인 화면으로
      </button>
      <button className="Fixed-Refresh" onClick={refresh}>
        새로고침
      </button>
      <p className="Guide-Time">
        사다리 진행 시간 조절 방법: Select.js의 delayTime과 Ladder.scss의
        delayTime 조절
      </p>
      <button
        className="Fixed-Look"
        onMouseDown={() => lookLadder(true)}
        onMouseUp={() => lookLadder(false)}
      >
        사다리 보기
      </button>
      <div className="LadderGame-Main">
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
