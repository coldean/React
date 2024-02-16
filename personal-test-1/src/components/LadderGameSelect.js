import { useState, useEffect } from "react";
import LadderGameLadder from "./LadderGameLadder";
import "./LadderGameSelect.scss";

const LadderGameSelect = ({ count }) => {
  const [buttons, setButtons] = useState([]);
  const [selectedButton, setSelectedButton] = useState(0);

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
        <LadderGameLadder
          count={count}
          buttons={buttons}
          selectedButton={selectedButton}
        />
      </div>
    </div>
  );
};

export default LadderGameSelect;
