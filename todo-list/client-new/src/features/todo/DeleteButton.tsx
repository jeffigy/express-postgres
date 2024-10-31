"use client";

import { Todo } from "@/types/Todo";
import React, { useEffect } from "react";
import { useDeleteTodoMutation } from "./todoMutations";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

type DeleteButtonProps = {
  todo: Todo;
};

const DeleteButton: React.FC<DeleteButtonProps> = ({ todo }) => {
  const {
    mutate: deleteTodo,
    isPending,
    isSuccess,
    isError,
    error,
  } = useDeleteTodoMutation();

  const handleDelete = (e: React.FormEvent) => {
    e.preventDefault();
    deleteTodo(todo.todo_id);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Success", {
        description: "todo deleted",
      });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      toast.error("Error", {
        description: error.message,
      });
    }
  }, [isError]);

  return (
    <Button disabled={isPending} onClick={handleDelete} variant={"ghost"}>
      <Trash2 />
    </Button>
  );
};
export default DeleteButton;
