import React, { createContext, useReducer, ReactNode, useContext } from "react";

interface Todo {
  id: number;
  title: string;
  desc: string;
  done: boolean;
}

interface TodoState {
  todos: Todo[];
}

type TodoAction =
  | { type: "ADD_TODO"; payload: string }
  | { type: "DELETE_TODO"; payload: number }
  | { type: "TOGGLE_TODO"; payload: number }
  | { type: "EDIT_TODO"; payload: number };

const initialState: TodoState = {
  todos: [],
};

const todoReducer = (state: TodoState, action: TodoAction): TodoState => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: Date.now(),
            title: action.payload, // Assuming payload includes only title, modify this if needed
            desc: "", // Default description
            done: false,
          }, //will have a default  title of "new todotext "
        ],
      };
    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload ? { ...todo, done: !todo.done } : todo
        ),
      };
    case "EDIT_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? {
                ...todo,
                title: action.payload.title,
                desc: action.payload.desc,
                done: action.payload.done,
              }
            : todo
        ),
      };
    default:
      return state;
  }
};

// Create a context for the todo state
const TodoContext = createContext<{
  state: TodoState;
  dispatch: React.Dispatch<TodoAction>;
}>({
  state: initialState,
  dispatch: () => undefined,
});

// Create a provider component
export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

// Create a custom hook to use the TodoContext
export const useTodoContext = () => useContext(TodoContext);
