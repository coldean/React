import { useState } from "react";

const Sample = () => {
  const [names, setNames] = useState([
    { id: 1, text: "a" },
    { id: 2, text: "b" },
    { id: 3, text: "c" },
    { id: 4, text: "d" },
  ]);

  const [inputText, setInputText] = useState("");
  const [nextId, setNextId] = useState(5);

  const onChange = (e) => {
    setInputText(e.target.value);
  };
  const onButtonClick = () => {
    const nameList = names.concat({
      id: nextId,
      text: inputText,
    });
    setNames(nameList);
    setNextId(nextId + 1);
    setInputText("");
  };

  const nameL = names.map((name) => <li key={name.id}>{name.text}</li>);

  return (
    <>
      <input value={inputText} onChange={onChange}></input>
      <button onClick={onButtonClick}>button</button>
      <ul>{nameL}</ul>
    </>
  );
};

export default Sample;
