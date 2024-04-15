import { ChangeEvent, MouseEvent } from "react";
import Todo from "../../TodoTypes";
import "./index.css";

type Props = {
  id: string;
  name: string;
  done: boolean;
  updateTodo: (id: string) => void;
  onDeleteTodo:(id:string) => void;
};

export default function Item(props: Props) {
  const { id, name, done, updateTodo, onDeleteTodo } = props;


  const onChangeCheckBox = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('checked todo id:',id);
    const item =e.currentTarget.checked; // returns boolean wether checked or not
    updateTodo(id);
  };
 const deleteItemHandler = () => {
  if(window.confirm('Are you sure?')) onDeleteTodo(id)};
  return (
    <li>
      <label>
        {/* checked={done} => defaut checked will be items with done= true  */}
        <input type="checkbox" onChange={onChangeCheckBox} checked={done} />
        <span>{name}</span>
      </label>
      {/* style={{ display: "inline-block" }} */}
      <button className="btn btn-danger" onClick={deleteItemHandler}>
        Delete
      </button>
    </li>
  );
}
