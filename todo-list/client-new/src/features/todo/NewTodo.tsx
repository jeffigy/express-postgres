"use client";
import React, { useEffect, useState } from "react";
import { useNewTodoMutation } from "./todoMutations";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const NewTodo = () => {
  const [description, setdescription] = useState("");
  const {
    mutate: newTodo,
    isError,
    isPending,
    error,
    isSuccess,
  } = useNewTodoMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    newTodo(description);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Success", {
        description: "new todo added",
      });
      setdescription("");
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
    <form
      onSubmit={handleSubmit}
      className="flex w-full  mx-auto space-x-1 max-w-screen-sm"
    >
      <Input
        placeholder="What's on your mind?"
        value={description}
        onChange={({ target }) => setdescription(target.value)}
      />{" "}
      <Button type="submit" disabled={isPending || !description}>
        {isPending ? "Adding todo..." : "Add Todo"}
      </Button>
    </form>
  );
};

export default NewTodo;
