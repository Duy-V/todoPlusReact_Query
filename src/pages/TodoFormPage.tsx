import MessageDisplay from "../components/MessageDisplay";
import TodoForm from "./../components/todo/TodoForm";

function TodoDetailsPage() {
  return (
    <div>
      <TodoForm isEditing={false} existingTodo={null} />
    </div>
  );
}

export default TodoDetailsPage;
