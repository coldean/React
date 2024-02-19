import { useState, useEffect, useCallback } from "react";
import Ladder from "./Ladder";
import LadderStart from "./LadderStart";
import "./Select.scss";

const LadderGameSelect = ({ count }) => {
  const [buttons, setButtons] = useState([]);
  const [selectedButton, setSelectedButton] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [DeletedLines, setDeletedLines] = useState();

  const ladderStep = 4;

  useEffect(() => {
    const newButtons = [];
    for (let i = 0; i < count; i++) {
      newButtons.push({ id: i, name: "test " + i });
    }
    setButtons(newButtons);
  }, [count]);

  useEffect(() => {
    // isStarted 값이 변경될 때마다 실행되는 코드
    // 여기서 원하는 동작을 수행할 수 있습니다.
    console.log("isStarted 값 변경됨:", isStarted);
  }, [isStarted]);

  useEffect(() => {
    console.log("selectedButton 값 변경: ", selectedButton);
  }, [selectedButton]);

  const onClick = (id) => () => {
    setSelectedButton(id);
    setIsStarted(true);
  };

  const getDeletedLines = useCallback((lines) => {
    setDeletedLines(lines);
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
        {isStarted ? (
          <LadderStart
            count={count}
            ladderStep={ladderStep}
            deletedLines={DeletedLines}
            selectedButton={selectedButton}
          />
        ) : (
          <Ladder
            count={count}
            ladderStep={ladderStep}
            buttons={buttons}
            selectedButton={selectedButton}
            getDeletedLines={getDeletedLines}
            checkStart={checkStart}
          />
        )}
      </div>
    </div>
  );
};

export default LadderGameSelect;
