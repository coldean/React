import { useState, useEffect } from "react";
import LadderGameLadder from "./LadderGameLadder";

const LadderGameSelect = ({ count }) => {
  const [buttons, setButtons] = useState([]);
  const [counts, setCounts] = useState(0);

  useEffect(() => {
    const newButtons = [];
    for (let i = 0; i < count; i++) {
      newButtons.push({ id: i, name: "test" });
    }
    setButtons(newButtons);
  }, [count]);

  return (
    <div>
      <div>
        {buttons.map(({ id, name }) => (
          <button key={id}>{name}</button>
        ))}
      </div>
      <div>
        <LadderGameLadder />
      </div>
    </div>
  );
};

export default LadderGameSelect;
