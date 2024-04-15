import { ChangeEvent } from "react";
import Todo from "../../TodoTypes";
import Item from "../Item"; // Import Item component
import "./index.css";

type Props = {
  todos: Todo[];
  updateTodo: (id: string) => void;
  onDeleteTodo: (id: string) => void;
};

export default function List(props: Props) {
  const { todos, updateTodo, onDeleteTodo } = props;
  return (
    <ul className="todo-main">
      {todos.map((todo) => (
        <Item key={todo.id} {...todo} 
        updateTodo={updateTodo} 
        onDeleteTodo={onDeleteTodo} />
      ))}
    </ul>
  );
}
