import React, { useState, useCallback, useEffect } from "react";
import "./LadderGameLadder.scss";

const LadderGameLadder = ({ count }) => {
  const ladderStep = 4;

  const [verLadder, setVerLadder] = useState([]);
  const [horLadder, setHorLadder] = useState([]);
  const [selectedLines, setSelectedLines] = useState([]);

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
    const selected = [];
    for (let i = 0; i < count - 1; i++) {
      selected.push(Math.floor(Math.random() * (ladderStep + 1)));
    }
    setSelectedLines(selected);
  }, [count, ladderStep]);

  return (
    <div>
      {horLadder.map(({ id: horId }) => (
        <div key={horId} className="LadderGameLadder-Main-Vertical">
          {verLadder.map(({ id: verId }) => (
            <div key={verId}>
              {horId === ladderStep ? ( // 세로
                <div className="Ladder-Vertical-last">test</div>
              ) : (
                <div className="Ladder-Vertical">test</div>
              )}

              {verId === count - 1 || horId === ladderStep ? null : ( // 가로
                <div
                  className={`Ladder-Horizontal ${
                    selectedLines[verId] === horId ? "selected" : ""
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

export default LadderGameLadder;

// [가로선][세로선] 2차원 배열 만들어서 제거된 사다리 저장
// 라인 선택하면 그 라인 밑으로 양쪽 확인하면서 진행
// ex) 2번 라인 : [0][1], [0][2] => [1][1], [1][2]
