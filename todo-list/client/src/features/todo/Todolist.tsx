"use client";

import { useTodos } from "./todoQueries";
import { LoaderCircle } from "lucide-react";
import Todo from "./Todo";
import { AxiosApiResponse } from "@/types/ServerResponse";

const Todolist = () => {
  const { data, isLoading, isError, error } = useTodos();

  if (isLoading) return <LoaderCircle className="animate-spin mx-auto" />;
  if (isError)
    return (
      <p className="mx-auto">
        {(error as AxiosApiResponse).response?.data.message ?? error.name}
      </p>
    );

  return (
    <div className="flex flex-col space-y-3">
      {data?.map((todo) => (
        <Todo key={todo.todo_id} todo={todo} />
      ))}
    </div>
  );
};

export default Todolist;
