import { useState } from "react";
import LadderGameSelect from "../components/LadderGameSelect";
import LadderGameLadder from "../components/LadderGameLadder";
import LadderGameCount from "../components/LadderGameCount";

const LadderGame = () => {
  const [selected, setSelected] = useState("");
  return (
    <div>
      <LadderGameCount />
      <LadderGameSelect />
      <LadderGameLadder />
    </div>
  );
};

export default LadderGame;
