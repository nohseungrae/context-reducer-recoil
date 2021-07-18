import uuid from "uuid";
import { ADD, COMPLETE, DELETE, UNCOMPLETE } from "./types";

export type ToDos = { text?: string; id: string };
export interface State {
  toDos: ToDos[];
  completed: ToDos[];
}
type Action = { type: string; payload: string };

export const initialState: State = {
  toDos: [],
  completed: [],
};
export const reducer = (
  state: State = initialState,
  { type, payload }: Action
) => {
  switch (type) {
    case ADD:
      return {
        ...state,
        toDos: [...state.toDos, { text: payload, id: uuid.v4() }],
      };
    case DELETE:
      return {
        ...state,
        toDos: state.toDos.filter((todo) => todo.id !== payload),
      };
    case COMPLETE:
      const target: ToDos = state.toDos.find(
        (todo) => todo.id === payload
      ) as ToDos;
      return {
        ...state,
        toDos: state.toDos.filter((toDo) => toDo.id !== payload),
        completed: [...state.completed, { ...target }],
      };
    case UNCOMPLETE:
      const aTarget: ToDos = state.completed.find(
        (toDo) => toDo.id === payload
      ) as ToDos;
      return {
        ...state,
        completed: state.completed.filter((toDo) => toDo.id !== payload),
        toDos: [...state.toDos, { ...aTarget }],
      };
    default:
      return state;
  }
};
