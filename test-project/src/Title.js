import React, {useState} from "react";

export default function Title({title, onGetData}){
    const [newTitle, setNewTitle] = useState("new Title");

    onGetData(newTitle);

    return <h2>{title}</h2>;
}