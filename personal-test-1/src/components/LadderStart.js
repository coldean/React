import React, { useState, useCallback, useEffect } from "react";
import "./Ladder.scss";

const LadderStart = ({ count, ladderStep, deletedLines, selectedButton }) => {
  const [verLadder, setVerLadder] = useState([]);
  const [horLadder, setHorLadder] = useState([]);

  const followingHor = [];
  for (let i = 0; i < ladderStep; i++) {
    followingHor.push([]);
    for (let j = 0; j < count - 1; j++) {
      followingHor[i].push(false); // 초기값으로 false 넣음
    }
  }
  const followingVer = [];
  for (let i = 0; i < ladderStep; i++) {
    followingVer.push([]);
    for (let j = 0; j < count - 1; j++) {
      followingVer[i].push(false); // 초기값으로 false 넣음
    }
  }

  useEffect(() => {
    const newVerLadder = [];
    const newHorLadder = [];

    for (let i = 0; i < count; i++) {
      newVerLadder.push({ id: i });
    }
    for (let i = 0; i <= ladderStep; i++) {
      newHorLadder.push({ id: i });
    }

    setVerLadder(newVerLadder);
    setHorLadder(newHorLadder);
  }, [count, ladderStep]);

  // 선택된 라인 따라가는 함수
  const followLine = () => {
    var curSelect = selectedButton;
    for (let i = 0; i < ladderStep; i++) {
      if (curSelect > 0 && deletedLines[i][curSelect - 1]) {
        followingHor[i][curSelect - 1] = true;
        curSelect -= 1;
      } else if (curSelect < count - 2 && deletedLines[i][curSelect]) {
        followingHor[i][curSelect] = true;
      }
    }
  };
  return (
    <div>
      {horLadder.map(({ id: horId }) => (
        <div key={horId} className="LadderGameLadder-Main-Vertical">
          {verLadder.map(({ id: verId }) => (
            <div key={verId}>
              {horId === ladderStep ? ( // 세로
                <div className="Ladder-Vertical-last"></div>
              ) : (
                <div className="Ladder-Vertical"></div>
              )}

              {verId === count - 1 || horId === ladderStep ? null : ( // 가로
                <div
                  className={`Ladder-Horizontal ${
                    deletedLines[horId][verId] ? "deleted" : ""
                  }`}
                >
                  test
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default LadderStart;
