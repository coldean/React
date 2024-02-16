import { useState, useCallback, useEffect } from "react";
import LadderGameSelect from "../components/LadderGameSelect";
import LadderGameLadder from "../components/LadderGameLadder";
import LadderGameCount from "../components/LadderGameCount";
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
