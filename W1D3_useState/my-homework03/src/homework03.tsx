//3. Build a component that generates a random number between 1 and 100 when a button is clicked. Display the generated number using useState.

import { useState } from "react";

function RandomNumGenerator() {
  const [randomNumber, setRandomNumber] = useState<number>(0);
  const random_num_generator_handler = () => {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    setRandomNumber(randomNumber);
  };
  return (
    <>
      {randomNumber}
      <button onClick={random_num_generator_handler}>
        click to generate R.number 1 - 100
      </button>
    </>
  );
}
export default RandomNumGenerator;
