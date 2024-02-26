import { useState } from "react";

const EventPractice = () => {
  const [usename, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const onChangeUsername = (e) => setUsername(e.target.value);
  const onChangeMeessage = (e) => setMessage(e.target.value);
};
