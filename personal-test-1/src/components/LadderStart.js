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
  for (let i = 0; i < ladderStep + 1; i++) {
    followingVer.push([]);
    for (let j = 0; j < count; j++) {
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
  useEffect(() => {
    const followLine = () => {
      // 가로선
      var curVertical = selectedButton;
      for (let i = 0; i < ladderStep; i++) {
        if (curVertical > 0 && deletedLines[i][curVertical - 1]) {
          followingHor[i][curVertical - 1] = true;
          curVertical -= 1;
        } else if (curVertical < count - 2 && deletedLines[i][curVertical]) {
          followingHor[i][curVertical] = true;
          curVertical += 1;
        } else {
          // 가로가 없을 때. 왼쪽 끝, 오른쪽 끝인 경우도 포함
          // 아마 아무것도 안해도 될 듯 함.
        }
      }

      // 세로선
      curVertical = selectedButton;
      followingVer[0][curVertical] = true;
      for (let i = 1; i < ladderStep + 1; i++) {
        if (curVertical > 0 && deletedLines[i][curVertical - 1]) {
          followingVer[i][curVertical - 1] = true;
          curVertical -= 1;
        } else if (curVertical < count - 1 && deletedLines[i][curVertical]) {
          followingVer[i][curVertical + 1] = true;
          curVertical += 1;
        } else {
          // 가로가 없을 때. 왼쪽 끝, 오른쪽 끝인 경우도 포함
          followingVer[i][curVertical] = true;
        }
      }
    };
  });

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
                    followingHor[horId][verId]
                      ? "selected"
                      : deletedLines[horId][verId]
                      ? "deleted"
                      : ""
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
