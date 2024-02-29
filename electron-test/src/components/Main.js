import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Main.scss";
import LadderGameCount from "./Count";

const Main = () => {
  const [count, setCount] = useState(2);
  const [isStarted, setIsStarted] = useState(false);

  const [inputs, setInputs] = useState([]);
  //const [buttons, setButtons] = useState([]);
  //const [results, setResults] = useState([{ id: 0, text: "null" }]); //꼼수 위해 억지 값 하나 저장

  const navigate = useNavigate();
  const navigateToGame = () => {
    // 함수는 못보냄, 값만 보낼 수 있음.
    navigate("/laddergame", {
      state: {
        count: count,
        //editCount: editCount,
        isStarted: isStarted,
        //setStart: setStart,
        inputs: inputs,
      },
    });
  };

  const editCount = useCallback((n) => {
    setCount(n);
  });

  const setStart = useCallback((bool) => {
    setIsStarted(bool);
  });

  useEffect(() => {
    const newInputs = [];
    for (let i = 0; i < count; i++) {
      newInputs.push({ id: i, value: i + 1 });
    }
    setInputs(newInputs);
  }, [count]);

  const onChangeSelect = useCallback((e, id) => {
    const newValue = e.target.value;
    setInputs((prevInputs) =>
      prevInputs.map((input) =>
        input.id === id ? { ...input, value: newValue } : input
      )
    );
  }, []);

  return (
    <div className="Main">
      <div className="Title">사다리타기</div>
      <LadderGameCount
        className="LadderGameCount-Main"
        count={count}
        editCount={editCount}
        setStart={setStart}
        isStarted={isStarted}
      />
      {console.log(isStarted, count)}
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
      <div className="Button-Container">
        <button className="Button" onClick={navigateToGame}>
          시작
        </button>
      </div>
    </div>
  );
};

export default Main;
