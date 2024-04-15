import React, { ChangeEvent } from 'react'

import './index.css'

import Todo from '../../TodoTypes';
type Props = {
  todos: Todo[];
  checkedAll: (id: boolean) => void;
  deleteFinishedTask: () => void;
};
export default function Footer(props:Props) {
  const { todos, checkedAll, deleteFinishedTask } = props;


  const changeHandler =(e:ChangeEvent<HTMLInputElement>) =>{
    const isChecked = e.target.checked;
    checkedAll(isChecked);
  }
  
  const finishedTask = () => {
    // const hasFinishedTasks = todos.map(todo => todo.done);
    // if (hasFinishedTasks) {
    deleteFinishedTask();
  };
  return (
    <div className="todo-footer">
      <label>
        <input type="checkbox" checked={todos.filter(todo=>todo.done === true).length === todos.length && todos.length!==0  } onChange={changeHandler} /> 
      </label>
      <span>
        <span>Finished {todos.filter(todo=>todo.done === true).length}</span> / total {todos.length}
      </span>
      <button className="btn btn-danger" onClick={finishedTask}>Delete Finished Tasks</button>
    </div>
  );
}
