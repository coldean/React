import React, { useState, useEffect } from "react";
import "./Ladder.scss";

const LadderGameLadder = ({ count, ladderStep, getDeletedLines }) => {
  const [verLadder, setVerLadder] = useState([]);
  const [horLadder, setHorLadder] = useState([]);
  const [DeletedLines, setDeletedLines] = useState();

  const deleted = [];
  for (let i = 0; i < ladderStep; i++) {
    deleted.push([]);
    for (let j = 0; j < count - 1; j++) {
      deleted[i].push(false); // 초기값으로 false 넣음
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

    // 랜덤하게 선택된 가로선 저장
    for (let j = 0; j < count - 1; j++) {
      var checkFull = true;
      var checkEmpty = ladderStep;
      for (let i = 0; i < ladderStep; i++) {
        if (Math.random() > 0.6 && j === 0) {
          // 현재 열이 첫 번째 열일 때만 선택
          deleted[i][j] = true;
          checkFull = false;
          checkEmpty -= 1;
        } else if (!deleted[i][j - 1] && j !== 0) {
          // 이전 열이 false일 때 선택
          deleted[i][j] = true;
          checkFull = false;
          checkEmpty -= 1;
        } else if (Math.random() > 0.6) {
          deleted[i][j] = true;
          checkFull = false;
          checkEmpty -= 1;
        }
      }
      if (checkFull) {
        var num = Math.floor(Math.random() * ladderStep);
        deleted[num][j] = true;
      }
      if (checkEmpty <= 0) {
        while (true) {
          var num = Math.floor(Math.random() * ladderStep);
          if (j === 0) {
            deleted[num][j] = false;
            break;
          } else if (deleted[num][j - 1]) {
            deleted[num][j] = false;
            break;
          }
        }
      }
    }
    setDeletedLines(deleted);
    getDeletedLines(deleted);
  }, [count, ladderStep]);

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
                    DeletedLines[horId][verId] ? "deleted" : ""
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default LadderGameLadder;

// 가로선 저장 방법
// [가로선][세로선] 2차원 배열 만들어서 제거된 사다리 저장
// 라인 선택하면 그 라인 밑으로 양쪽 확인하면서 진행
// ex) 2번 라인 : [0][1], [0][2] => [1][1], [1][2]
//
// 세로선 저장 방법
// [세로선][가로 인덱스] 2차원 배열
//
// 배열 저장은 ...Ladder 배열에 요소로 집어넣으면 될듯. row: ~, col: ~ 이런식으로
// 아니면 Ladder 배열 자체를 2차원으로 만들던지..
// selected 배열을 2차원으로 만들고, horId, verId 값을 selected 배열에 저장된 값이랑 비교해서
// 둘 다 동일 (&&) 할 경우 사다리 진행해도 될듯. 따로 배열이나 저장 값 안만들고.
