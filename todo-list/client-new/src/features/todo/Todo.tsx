import { Card, CardContent } from "@/components/ui/card";
import { Todo as TodoType } from "@/types/Todo";
import DeleteButton from "./DeleteButton";
import EditTodoModal from "./EditTodoModal";

type TodoProps = {
  todo: TodoType;
};

const Todo: React.FC<TodoProps> = ({ todo }) => {
  return (
    <Card className=" rounded-sm w-full max-w-screen-sm mx-auto">
      <CardContent className=" p-3 flex justify-between items-center">
        <p className="">{todo.description}</p>
        <div>
          <EditTodoModal todo={todo} />
          <DeleteButton todo={todo} />
        </div>
      </CardContent>
    </Card>
  );
};
export default Todo;
