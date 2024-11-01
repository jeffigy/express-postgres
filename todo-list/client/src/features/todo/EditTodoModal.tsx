"use client";

import { Todo } from "@/types/Todo";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useEditTodoMutation } from "./todoMutations";
import { toast } from "sonner";

type EditTodoModalProps = {
  todo: Todo;
};

const EditTodoModal: React.FC<EditTodoModalProps> = ({ todo }) => {
  const [description, setDescription] = useState(todo.description);
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);
  const {
    mutate: editTodo,
    isPending,
    isSuccess,
    isError,
    error,
  } = useEditTodoMutation();

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    const todoOjb = {
      todo_id: todo.todo_id,
      description,
    };
    editTodo(todoOjb);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Success", {
        description: "todo updated",
      });
      closeDialog();
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
    <>
      <Button onClick={openDialog} variant={"ghost"}>
        <Pencil />
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant={"ghost"} className="hidden">
            <Pencil />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Todo</DialogTitle>
            <DialogDescription className="hidden">
              Your description here, giving more context to the dialog content.
            </DialogDescription>
          </DialogHeader>
          <Input
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />
          <DialogFooter>
            <Button
              onClick={handleEdit}
              disabled={isPending || todo.description === description}
            >
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default EditTodoModal;
