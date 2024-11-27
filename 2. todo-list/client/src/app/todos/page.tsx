import NewTodo from "@/features/todo/NewTodo";
import Todolist from "@/features/todo/Todolist";
import React from "react";

const page = () => {
  return (
    <>
      <NewTodo />
      <Todolist />
    </>
  );
};

export default page;
