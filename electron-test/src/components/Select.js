// isAll이 true 일 때 결과 모두 보여주도록 해야 함

import { useState, useEffect, useCallback } from "react";
import Ladder from "./Ladder";
import LadderStart from "./LadderStart";
import "./Select.scss";

const LadderGameSelect = ({ count, setStart, isStarted, look, names }) => {
  const [inputs, setInputs] = useState(names);
  const [buttons, setButtons] = useState(names);
  const [results, setResults] = useState([{ id: 0, text: "null" }]); //꼼수 위해 억지 값 하나 저장
  const [final, setFinal] = useState(0);
  const [selectedButton, setSelectedButton] = useState(null);
  const [deletedLines, setDeletedLines] = useState();
  const [resultDelay, setResultDelay] = useState(0);
  const [resultVisible, setResultVisible] = useState(false);
  const [isAll, setIsAll] = useState(false);

  /////////////////////////
  ///////사다리 깊이////////
  const ladderStep = 10; //
  /////////////////////////
  /////////////////////////
  ///////딜레이 시간////////
  const delayTime = 0.3; //
  /////////////////////////
  /////////////////////////

  useEffect(() => {
    //const newButtons = [];
    //const newInputs = [];
    const newResults = [];
    for (let i = 0; i < count; i++) {
      //newButtons.push({ id: i, name: i + 1 });
      //newInputs.push({ id: i, value: i + 1 });
      newResults.push({ id: i, text: "" });
    }
    //setInputs(newInputs);
    //setButtons(newButtons);
    setResults(newResults);
    setFinal(0);
  }, [count]);

  useEffect(() => {
    setResultVisible(false);
    if (isStarted) {
      const timer = setTimeout(() => {
        setResultVisible(true); // 결과를 표시하기 위한 상태를 변경
        console.log("time passed " + resultDelay);
      }, (resultDelay + 2) * delayTime * 1000); // resultDelay 시간 이후에 결과를 표시

      return () => clearTimeout(timer);
    }
  }, [isStarted, count, resultDelay]);

  const onClick = (id) => () => {
    setSelectedButton(id);
    setStart(true);
  };

  const getDeletedLines = useCallback((lines) => {
    setDeletedLines(lines);
  }, []);

  /*
  const onChangeSelect = useCallback((e, id) => {
    const newValue = e.target.value;
    setInputs((prevInputs) =>
      prevInputs.map((input) =>
        input.id === id ? { ...input, value: newValue } : input
      )
    );
    setButtons((prevButtons) =>
      prevButtons.map((button) =>
        button.id === id ? { ...button, name: newValue } : button
      )
    );
  }, []);
*/

  const onChangeResult = useCallback((e, id) => {
    const newValue = e.target.value;
    setResults((prevResults) =>
      prevResults.map((result) =>
        result.id === id ? { ...result, text: newValue } : result
      )
    );
  }, []);

  const finalId = useCallback((final) => {
    setFinal(final);
  });

  const getDelay = useCallback((time) => {
    setResultDelay(time);
  });

  return (
    <div className="LadderGameSelect-Main">
      <div>
        {buttons.map(({ id, value }) => (
          <button className="SelectButton" key={id} onClick={onClick(id)}>
            {value}
          </button>
        ))}
      </div>

      <div className={`Visible ${isStarted || look ? "visible" : "invisible"}`}>
        {isStarted ? (
          <LadderStart
            count={count}
            ladderStep={ladderStep}
            deletedLines={deletedLines}
            selectedButton={selectedButton}
            finalId={finalId}
            getDelay={getDelay}
            isAll={isAll}
            buttons={buttons}
            results={results}
          />
        ) : (
          <Ladder
            count={count}
            ladderStep={ladderStep}
            getDeletedLines={getDeletedLines}
          />
        )}
      </div>
      <div>
        {results.map(({ id, text }) => (
          <input
            key={id}
            className="SelectInput"
            name={id}
            onChange={(e) => onChangeResult(e, id)}
            value={text}
          ></input>
        ))}
      </div>
      <p className="Guide-Result">결과 입력</p>
      <p
        className={`Visible ${
          resultVisible ? "visible result" : "invisible result"
        }`}
      >
        result: {results[final].text}
      </p>
    </div>
  );
};

export default LadderGameSelect;
