"use client";

import { Todo } from "@/types/Todo";
import { useTodos } from "./todoQueries";
import { Card, CardContent } from "@/components/ui/card";

const Todolist = () => {
  const { data, isLoading } = useTodos();

  if (isLoading) return <p>loading...</p>;
  if (!data) return <p>no data found</p>;

  return (
    <>
      {data.map((todo: Todo) => (
        <Card key={todo.todo_id} className=" w-full max-w-screen-lg">
          <CardContent className="pt-6 ">
            <p>{todo.description}</p>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default Todolist;
