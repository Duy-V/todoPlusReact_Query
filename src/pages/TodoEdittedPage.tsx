import { useState, useEffect } from "react";
import useTodo from "../hooks/todoHook/useTodo";
import { useParams } from "react-router-dom";
import TodoForm from "../components/todo/TodoForm";

function TodoEdittedPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [existingTodo, setExistingTodo] = useState(null);
  const { id } = useParams(); // Get the id parameter from the URL
  const { data: todo } = useTodo(id || "");
  useEffect(() => {
    if (todo) {
      setIsEditing(true);
      setExistingTodo(todo);
    } else {
      setIsEditing(false);
      setExistingTodo(null);
    }
  }, [todo]);
  return (
    <div>
      <h1>Edit Todo</h1>
      <TodoForm isEditing={isEditing} existingTodo={existingTodo} />
    </div>
  );
}

export default TodoEdittedPage;
