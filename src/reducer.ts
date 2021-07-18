import uuid from "uuid";
import { ADD, DELETE } from "./types";

export type ToDos = { text?: string; id: string };
interface State {
  toDos: ToDos[];
}
type Action = { type: string; payload: string };

export const initialState: State = {
  toDos: [],
};
export const reducer = (
  state: State = initialState,
  { type, payload }: Action
) => {
  switch (type) {
    case ADD:
      return { toDos: [...state.toDos, { text: payload, id: uuid.v4() }] };
    case DELETE:
      return { toDos: state.toDos.filter((todo) => todo.id !== payload) };
    default:
      return state;
  }
};
