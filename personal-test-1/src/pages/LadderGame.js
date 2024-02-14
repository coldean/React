import { useState, useCallback, useEffect } from "react";
import LadderGameSelect from "../components/LadderGameSelect";
import LadderGameLadder from "../components/LadderGameLadder";
import LadderGameCount from "../components/LadderGameCount";

const LadderGame = () => {
  const [count, setCount] = useState(2);

  const editCount = useCallback((n) => {
    setCount(n);
  });
  console.log("called LadderGame, Count = ", { count });
  return (
    <div>
      <LadderGameCount editCount={editCount} />
      <LadderGameSelect count={count} />
    </div>
  );
};

export default LadderGame;
