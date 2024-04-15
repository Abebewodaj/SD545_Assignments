import Header from './components/Header';
import Footer from './components/Footer';
import List from './components/List';


import './App.css'
import { useEffect, useState } from 'react';
import Todo from './TodoTypes';
function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    async function getTodoList() {
      const response = await fetch("http://localhost:3005/todos");
      const data = await response.json();
      setTodos(data);
      //console.log(data);
    }
    getTodoList();
  }, []);

  const addNewTodoTask = ( newTodo:Todo) =>{
    //const newTodo = { id, name, done };
     setTodos([...todos, newTodo])}  

     const updateTodo = (id: string) => {
    const newTodos = todos!.map((todo => todo.id === id? { ...todo, done:!todo.done }:todo)); // not done to be done two ways change, if !done amke done vs
    setTodos(newTodos);
    console.log('......',newTodos);
  };
  
     const checkedAll = (done: boolean) => {
    const updatedTodosDone = todos!.map(todo =>({...todo,done:done})); 
    setTodos(updatedTodosDone);
    //console.log(todos);
  };



  const deleteTodo = (id: string) => {
    const updatedTodos = todos.filter((todo => todo.id !== id)); // exluding (id:string ) from todos
    console.log('todosss:',updatedTodos);
    setTodos(updatedTodos);
  };

  // const deleteFinishedTask = () => {
  //   const updatedTodos = todos.filter((todo) => !todo.done);
  //   setTodos(updatedTodos);
  // };
  const deleteFinishedTask = () => {
    const updatedTodosForDelete = todos.filter((todo) => !todo.done); //todo.done === !true, false!!
    //console.log('filter',updatedTodosForDelete);
    //  const hasFinishedTasks = todos.map(todo => todo.done);
    //  if (hasFinishedTasks) {

    setTodos(updatedTodosForDelete);
  };
  return (
    <div className="todo-container">
      <div className="todo-wrap">
        <Header addNewTodoTask={addNewTodoTask} />
        <List todos={todos} updateTodo={updateTodo} onDeleteTodo={deleteTodo} />
        <Footer todos={todos} checkedAll={checkedAll} deleteFinishedTask={deleteFinishedTask} />
      </div>
    </div>
  );
}
export default App;

