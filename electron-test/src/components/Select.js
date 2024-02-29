// 현재는 result에 0번 인덱스 출력되게 임시로 해놓음. 수정 필요.
// 숨겨뒀다가 결과 나오면 보이는 형식으로 css 수정하면 될 듯 함.

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

  /////////////////////////
  ///////사다리 깊이////////
  const ladderStep = 10; //
  /////////////////////////

  useEffect(() => {
    const newButtons = [];
    const newInputs = [];
    const newResults = [];
    //results.pop();
    for (let i = 0; i < count; i++) {
      newButtons.push({ id: i, name: i + 1 });
      newInputs.push({ id: i, value: i + 1 });
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
      }, (resultDelay + 2) * 300); // resultDelay 시간 이후에 결과를 표시

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
      {/*
      <div>
        {inputs.map(({ id, value }) => (
          <input
            key={id}
            className="SelectInput"
            name={id}
            onChange={(e) => onChangeSelect(e, id)}
            value={value}
          ></input>
        ))}
      </div>
        */}
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
