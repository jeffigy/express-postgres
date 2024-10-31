import api from "@/store/api";
import { Todo } from "@/types/Todo";

export const fetchTodos = async () => {
  return (await api.get<Todo[]>("/todos")).data;
};
