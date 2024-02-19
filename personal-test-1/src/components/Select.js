import { useState, useEffect, useCallback } from "react";
import LadderGameLadder from "./Ladder";
import "./Select.scss";

const LadderGameSelect = ({ count }) => {
  const [buttons, setButtons] = useState([]);
  const [selectedButton, setSelectedButton] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [selectedLines, setSelectedLines] = useState();

  useEffect(() => {
    const newButtons = [];
    for (let i = 0; i < count; i++) {
      newButtons.push({ id: i, name: "test " + i });
    }
    setButtons(newButtons);
  }, [count]);

  const onClick = (id) => () => {
    setSelectedButton(id);
  };

  const getSelectedLines = useCallback((lines) => {
    setSelectedLines(lines);
  });

  const checkStart = useCallback((check) => {
    setIsStarted(check);
  });

  return (
    <div className="LadderGameSelect-Main">
      <div>
        {buttons.map(({ id, name }) => (
          <button key={id} onClick={onClick(id)}>
            {name}
          </button>
        ))}
        {selectedButton}
      </div>
      <div>
        {isStarted ? null : (
          <LadderGameLadder
            count={count}
            buttons={buttons}
            selectedButton={selectedButton}
            getSelectedLines={getSelectedLines}
            checkStart={checkStart}
          />
        )}
      </div>
    </div>
  );
};

export default LadderGameSelect;
