import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Main.scss";

const Main = () => {
  const navigate = useNavigate();
  const navigateToGame = () => {
    navigate("/laddergame");
  };

  return (
    <div className="Main">
      <div className="Title">사다리타기</div>
      <div className="Button-Container">
        <button className="Button" onClick={navigateToGame}>
          시작
        </button>
      </div>
    </div>
  );
};

export default Main;
