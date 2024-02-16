import { React, useState, useCallback, useEffect } from "react";
import LadderGameCount from "./LadderGameCount";
import LadderGameSelect from "./LadderGameSelect";
import "./LadderGameLadder.scss";

const LadderGameLadder = ({ count, buttons, selectedButton }) => {
  const [verLadder, setVerLadder] = useState([]);
  const [horLadder, setHorLadder] = useState([]);

  useEffect(() => {
    const newVerLadder = [];
    const newHorLadder = [];

    for (let i = 0; i < count; i++) {
      newVerLadder.push({ id: i });
      //newHorLadder.push({ id: i });
    }
    for (let i = 0; i < 4; i++) {
      //newVerLadder.push({ id: i });
      newHorLadder.push({ id: i });
    }

    setVerLadder(newVerLadder);
    setHorLadder(newHorLadder);
  }, [count]);

  return (
    <div>
      {horLadder.map(
        (
          { id: horId } // horLadder를 map하여 각 요소에 대해 JSX 반환
        ) => (
          <div key={horId} className="LadderGameLadder-Main-Vertical">
            {verLadder.map(
              (
                { id: verId } // verLadder를 map하여 각 요소에 대해 JSX 반환
              ) => (
                <div key={verId}>
                  <div className="Ladder-Vertical">test</div>
                  <div className="Ladder-Horizontal">test</div>
                </div>
              )
            )}
          </div>
        )
      )}
    </div>
  );
};

export default LadderGameLadder;
