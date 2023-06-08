import { createContext } from "react";

interface TodoContextType {
  todos: any[];
  loading: boolean;
  setTodos: React.Dispatch<React.SetStateAction<[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TodoContext = createContext<TodoContextType>({
  todos: [],
  setTodos: () => [],
  loading: true,
  setLoading: () => [],
});
