
//2. Create a temperature converter component that allows users to enter a temperature in Celsius and 
//converts it to Fahrenheit when a button is clicked. Use useState to manage the temperature input and output.
import { useState } from "react";

function TemperatureConverter() {
  const [celsius, setCelsius] = useState<number>(0);

  const converterHandler = () => {
    const inputCelsiusValue = parseFloat(
      (document.getElementById("celsiusInput") as HTMLInputElement).value
    );
    const toFahrenheit = (inputCelsiusValue * 9) / 5 + 32;
    setCelsius(toFahrenheit);
  };

  return (
    <>
      {celsius}
      <input type="number" id="celsiusInput" />
      <button onClick={converterHandler}>Click to convert to Fahrenheit</button>
    </>
  );
}

export default TemperatureConverter;
