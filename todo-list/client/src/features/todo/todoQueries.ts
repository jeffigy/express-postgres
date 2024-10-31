import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchTodos } from "./todoApi";

export function useTodos() {
  return useQuery({
    queryKey: ["todos"],
    queryFn: () => fetchTodos(),
    placeholderData: keepPreviousData,
  });
}
