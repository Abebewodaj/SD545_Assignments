//2. Create a temperature converter component that allows users to enter a temperature in Celsius and
//converts it to Fahrenheit when a button is clicked. Use useState to manage the temperature input and output.
import { ChangeEvent, useRef, useState } from "react";


export default function TemperatureConverter() {
  const inputField = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState<number>(0);
  const [output, setoutput] = useState<number>();
  const handleChange_InputField = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(parseInt(e.target.value));
  };
  const converter = () => {
    const fahrenheit = (9 / 5) * input! + 32;
    //const celsiusValue = (input - 32) * 5/9
    setoutput(fahrenheit);
    //setoutput(celsiusValue);
    inputField.current!.value = "";
    inputField.current!.focus();
  };

  return (
    <div>
      celsius:{input}
      <input type="number" onChange={handleChange_InputField} ref={inputField} placeholder="enter celsius" />
      <button onClick={converter}>convert To Fahrenheit</button>
      Fahrenheit:{output}
    </div>
  );
}
