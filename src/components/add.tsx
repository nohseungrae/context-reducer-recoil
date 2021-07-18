import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import { ADD } from "../types";
import { useDispatch } from "../context";

export default () => {
  const [newToDo, setNewToDo] = useState("");
  const dispatch = useDispatch();
  const onSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: ADD, payload: newToDo });
    // resetText();
    // setTextUseSetRecoilState("변경~");
    // setToDos([...toDos, { text, id: uuid.v4() }]);
    // setToDosS([...toDosS, { text, id: uuid.v4() }]);
    setNewToDo("");
  };
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    // setText(value);
    setNewToDo(value);
  };
  return (
    <>
      <h1>Add To Do</h1>
      <form onSubmit={onSubmit}>
        <input
          type={"text"}
          onChange={onChange}
          value={newToDo}
          placeholder={"Write To Dos"}
        />
      </form>
    </>
  );
};
