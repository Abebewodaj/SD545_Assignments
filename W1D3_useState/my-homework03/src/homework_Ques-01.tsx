

// 1. Create a simple React component called Counter that displays a counter value initialized to 0.
// Include two buttons: one for incrementing the counter and another for decrementing it. Use useState to manage the counter state.

import { useState } from "react";
import './App.css'
function CounterHomework() {
  const [counter, setCounter] = useState(0);

  const incrementCounter = () => {
    setCounter(counter + 1);
  };

  const decrementCounter = () => {
    setCounter(counter - 1);
  };

  return (
    <div id="counter">
      {counter}
      <button onClick={incrementCounter}>increment</button>
      <button onClick={decrementCounter}>decrement</button>
   </div>
  )
}
export default CounterHomework;

