import { useState, useCallback, useEffect } from "react";
import LadderGameSelect from "../components/Select";
import LadderGameLadder from "../components/Ladder";
import LadderGameCount from "../components/Count";
import "./LadderGame.scss";

const LadderGame = () => {
  const [count, setCount] = useState(2);

  const editCount = useCallback((n) => {
    setCount(n);
  });
  console.log("called LadderGame, Count = ", { count });
  return (
    <div className="LadderGame-Main">
      <LadderGameCount className="LadderGameCount-Main" editCount={editCount} />
      <LadderGameSelect className="LadderGameSelect-Main" count={count} />
    </div>
  );
};

export default LadderGame;
