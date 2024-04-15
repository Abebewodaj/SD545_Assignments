import './index.css';
import { nanoid } from 'nanoid';
import { ChangeEvent, KeyboardEvent, useRef, useState } from 'react';
import Todo from '../../TodoTypes';
type props = {
  addNewTodoTask: (newTodo:Todo) => void;
};
export default function Header(props: props) {
  const { addNewTodoTask } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    const textValue = e.currentTarget.value.trim();
    if(textValue === "") return alert('task cannot be empty!!');
    if (textValue.length < 2 && e.key === "Enter") return alert("less character used!");
      if (e.key === "Enter"){
        addNewTodoTask({ id: nanoid(), name: textValue, done: false });
        inputRef.current!.value = "";
        inputRef.current!.focus();
      }
      }
  return (
    <div className="todo-header">
      <input type="text" ref={inputRef} onKeyUp={handleKeyEnter}placeholder="Enter task name!!!!"/>
    </div>
  );
}

