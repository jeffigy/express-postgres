import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTodo, editTodo, newTodo } from "./todoApi";
import { Todo } from "@/types/Todo";

export function useNewTodoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (description: string) => newTodo({ description }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });
}

export function useEditTodoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (todo: Todo) => editTodo(todo),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });
}

export function useDeleteTodoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteTodo({ id }),
    mutationKey: ["delete todo"],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });
}
