import api from "@/store/api";
import { Todo } from "@/types/Todo";

const todosUrl = "/todos";

export const fetchTodos = async () => {
  return (await api.get<Todo[]>(todosUrl)).data;
};

export const newTodo = async ({ description }: { description: string }) => {
  return (await api.post(todosUrl, { description })).data;
};

export const editTodo = async (todo: Todo) => {
  return (
    await api.patch(`${todosUrl}/${todo.todo_id}`, {
      description: todo.description,
    })
  ).data;
};

export const deleteTodo = async ({ id }: { id: number }) => {
  return (await api.delete(`${todosUrl}/${id}`)).data;
};
