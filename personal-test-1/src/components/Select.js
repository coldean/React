import { useState, useEffect, useCallback } from "react";
import Ladder from "./Ladder";
import LadderStart from "./LadderStart";
import "./Select.scss";

const LadderGameSelect = ({ count, setStart, isStarted }) => {
  const [inputs, setInputs] = useState([]);
  const [buttons, setButtons] = useState([]);
  const [selectedButton, setSelectedButton] = useState(0);
  const [deletedLines, setDeletedLines] = useState();

  ////////////////////////
  ///////사다리 깊이///////
  const ladderStep = 5; //
  ////////////////////////

  useEffect(() => {
    const newButtons = [];
    const newInputs = [];
    for (let i = 0; i < count; i++) {
      newButtons.push({ id: i, name: "" });
      newInputs.push({ id: i, value: "" });
    }
    setInputs(newInputs);
    setButtons(newButtons);
  }, [count]);

  const onClick = (id) => () => {
    setSelectedButton(id);
    setStart(true);
  };

  const getDeletedLines = useCallback((lines) => {
    setDeletedLines(lines);
  }, []);

  const onChange = useCallback((e, id) => {
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

  return (
    <div className="LadderGameSelect-Main">
      <div>
        {inputs.map(({ id, value }) => (
          <input
            key={id}
            name={id}
            onChange={(e) => onChange(e, id)}
            value={value}
          ></input>
        ))}
      </div>
      <div>
        {buttons.map(({ id, name }) => (
          <button key={id} onClick={onClick(id)}>
            {name}
          </button>
        ))}
        {selectedButton}
      </div>
      <div>
        {isStarted ? (
          <LadderStart
            count={count}
            ladderStep={ladderStep}
            deletedLines={deletedLines}
            selectedButton={selectedButton}
          />
        ) : (
          <Ladder
            count={count}
            ladderStep={ladderStep}
            getDeletedLines={getDeletedLines}
          />
        )}
      </div>
    </div>
  );
};

export default LadderGameSelect;
