// isAll이 True 일 때 모두 보여주는거 구현 하려 했는데 실패했습니다..ㅜㅜ
// 사다리 결과 계산하는 컴포넌트 입니다

import React, { useState, useEffect } from "react";
import "./Ladder.scss";

const LadderStart = ({
  count,
  ladderStep,
  deletedLines,
  selectedButton,
  finalId,
  getDelay,
  isAll,
  buttons,
  results,
}) => {
  const [verLadder, setVerLadder] = useState([]);
  const [horLadder, setHorLadder] = useState([]);
  const [routeHor, setRouteHor] = useState([]);
  const [routeVer, setRouteVer] = useState([]);
  const [allResults, setAllResults] = useState("");

  const followingHor = [];
  for (let i = 0; i < ladderStep; i++) {
    followingHor.push([]);
    for (let j = 0; j < count - 1; j++) {
      followingHor[i].push({ check: false, delay: 0, toLeft: false }); // 초기값으로 false 넣음
    }
  }
  const followingVer = [];
  for (let i = 0; i < ladderStep + 1; i++) {
    followingVer.push([]);
    for (let j = 0; j < count; j++) {
      followingVer[i].push({ check: false, delay: 0 }); // 초기값으로 false 넣음
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
  const followLine = (selectedButton) => {
    // 가로선
    var curVertical = selectedButton;
    var timeDelay = 0;
    for (let i = 0; i < ladderStep; i++) {
      if (curVertical > 0 && !deletedLines[i][curVertical - 1]) {
        timeDelay += 2;
        followingHor[i][curVertical - 1] = {
          check: true,
          delay: timeDelay,
          toLeft: true,
        };
        curVertical -= 1;
      } else if (curVertical < count - 1 && !deletedLines[i][curVertical]) {
        timeDelay += 2;
        followingHor[i][curVertical] = { check: true, delay: timeDelay };
        curVertical += 1;
      } else {
        // 가로가 없을 때. 왼쪽 끝, 오른쪽 끝인 경우도 포함
        // 아무것도 안해도 될 듯 함.
        timeDelay += 1;
        //followingHor[i][curVertical] = { delay: timeDelay };
      }
    }

    // 세로선
    curVertical = selectedButton;
    timeDelay = 1;
    followingVer[0][curVertical] = { check: true, delay: timeDelay };
    for (let i = 1; i < ladderStep + 1; i++) {
      if (curVertical > 0 && !deletedLines[i - 1][curVertical - 1]) {
        timeDelay += 2;
        followingVer[i][curVertical - 1] = { check: true, delay: timeDelay };
        curVertical -= 1;
      } else if (curVertical < count - 1 && !deletedLines[i - 1][curVertical]) {
        timeDelay += 2;
        followingVer[i][curVertical + 1] = { check: true, delay: timeDelay };
        curVertical += 1;
      } else {
        // 가로가 없을 때. 왼쪽 끝, 오른쪽 끝인 경우도 포함
        timeDelay += 1;
        followingVer[i][curVertical] = { check: true, delay: timeDelay };
      }
    }

    getDelay(timeDelay);
    setRouteHor(followingHor);
    setRouteVer(followingVer);
    finalId(curVertical);

    return curVertical;
  };

  useEffect(() => {
    followLine(selectedButton);
  }, [count, deletedLines, ladderStep, selectedButton]);

  // isAll이 True 일 때
  useEffect(() => {
    let line = allResults;
    if (isAll) {
      for (let i = 0; i < count; i++) {
        let rs = followLine(i);
        line =
          line +
          "\n" +
          "name: " +
          buttons[i].name +
          " result: " +
          results[rs].text;
        setAllResults(line);
      }
      console.log(allResults);
    }
  }, []);

  return (
    <div>
      {isAll === false &&
        horLadder.map(({ id: horId }) => (
          <div key={horId} className="LadderGameLadder-Main-Vertical">
            {verLadder.map(({ id: verId }) => (
              <div key={verId}>
                {/*}
              {horId === ladderStep // 끝인지 확인
                ? routeVer[horId][verId].check
                  ? getDelay(routeVer[horId][verId].delay + 1)
                  : null
                : null}{" "}
          */}
                <div className="Ladder-Vertical start">
                  <div
                    className={`Ladder-Vertical ${
                      // 세로
                      routeVer[horId][verId].check
                        ? `selected delay-${routeVer[horId][verId].delay}`
                        : ""
                    }`}
                  ></div>
                </div>
                {verId === count - 1 || horId === ladderStep ? null : ( // 가로
                  <div
                    className={
                      routeHor[horId][verId].check ? "Ladder-Horizontal" : ""
                    }
                  >
                    <div
                      className={`Ladder-Horizontal ${
                        routeHor[horId][verId].check
                          ? `selected delay-${routeHor[horId][verId].delay} ${
                              routeHor[horId][verId].toLeft ? "reverse" : ""
                            }`
                          : deletedLines[horId][verId]
                          ? "deleted start"
                          : ""
                      }`}
                    ></div>
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
