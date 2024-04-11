//3. Build a component that generates a random number between 1 and 100 when a button is clicked. Display the generated number using useState.

import { useState } from "react";

function RandomNumGenerator() {
  const [random, setRandom] = useState<number>();

  const generatorHandler = () => {
    setRandom(Math.floor(Math.random() * 100) + 1);
  };

  return (
    <div>
      Random:{random}
      <button onClick={generatorHandler}>
        <b>Random Number 1 - 100</b>
      </button>
    </div>
  );
}
export default RandomNumGenerator;
