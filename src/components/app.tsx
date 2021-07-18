import React, {
  ChangeEvent,
  MouseEvent,
  SyntheticEvent,
  useReducer,
  useState,
} from "react";
import {
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";
import { reducer, initialState, ToDos } from "../reducer";
import uuid from "uuid";
import { ADD, DELETE } from "../types";

const textState = atom({
  key: "textState", // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
});

const toDosState = atom<ToDos[]>({
  key: "toDosState", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

const todosSelector = selector<ToDos[]>({
  key: "todosSelector",
  get: ({ get }) => {
    return get(toDosState);
  },
  set: ({ set }, newTodo) => {
    set(toDosState, newTodo);
  },
});

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  //
  const [text, setText] = useRecoilState(textState);
  const [toDos, setToDos] = useRecoilState(toDosState);
  // const setTextUseSetRecoilState = useSetRecoilState(textState); // 값을 변경하는 함수만 반환
  // const resetText = useResetRecoilState(textState); // 설정된 기본값으로 리셋
  const [toDosS, setToDosS] = useRecoilState(todosSelector);
  console.log(toDosS);
  //
  const [newToDo, setNewToDo] = useState("");
  const onSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    // dispatch({ type: ADD, payload: newToDo });
    // resetText();
    // setTextUseSetRecoilState("변경~");
    // setToDos([...toDos, { text, id: uuid.v4() }]);
    setToDosS([...toDosS, { text, id: uuid.v4() }]);
  };
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    setText(value);
    // setNewToDo(value);
  };
  const onDelete = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    id: string
  ) => {
    // dispatch({
    //   type: DELETE,
    //   payload: id,
    // });
    setToDos(toDos.filter((todo) => todo.id !== id));
  };
  return (
    <div>
      <h1>Add To Do</h1>
      <form onSubmit={onSubmit}>
        <input
          type={"text"}
          onChange={onChange}
          value={text}
          placeholder={"Write To Dos"}
        />
      </form>
      <ul>
        <h2>To Dos</h2>
        {toDos.map((todo: ToDos) => (
          <li key={todo.id}>
            <span>{todo.text}</span>
            <button onClick={(e) => onDelete(e, todo.id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
