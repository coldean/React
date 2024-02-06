/*import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/

/*
import React from 'react';
import Hello from './Hello';

function App() {
  return (
    <div className="App">
      <Hello />
    </div>
  );
}

export default App;*/

import React, {useState} from "react";
import "./App.css";
import Title from "./Title";

function App(){
  const [title, setTitle] = useState("HELLO KOREA!");
  const [text, setText] = useState("")

  const onGetData = (newData) => {
    console.log("newData===");
    console.log(newData);
  }

  return (
    <div className="wrapper">
      <Title title={title} onGetData={onGetData}/>
      <input type = "text" value = {text} 
      onChange={e=>setText(e.target.value)}/>
      <button>change Title</button>
    </div>
  );
}

export default App;