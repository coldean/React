import LadderGame from "./pages/LadderGame";
import Main from "./components/Main";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/laddergame" element={<LadderGame />} />
    </Routes>
  );
}

export default App;
