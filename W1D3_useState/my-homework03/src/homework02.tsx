//2. Create a temperature converter component that allows users to enter a temperature in Celsius and
//converts it to Fahrenheit when a button is clicked. Use useState to manage the temperature input and output.
import { ChangeEvent, useState } from "react";

// function TemperatureConverter() {
//   const [celsius, setCelsius] = useState<number>(0);

//   const converterHandler = () => {
//     const inputCelsiusValue = parseFloat(
//       (document.getElementById("celsiusInput") as HTMLInputElement).value
//     );
//     const toFahrenheit = (inputCelsiusValue * 9) / 5 + 32;
//     setCelsius(toFahrenheit);
//   };

//   return (
//     <>
//       {celsius}
//       <input type="number" id="celsiusInput" />
//       <button onClick={converterHandler}>Click to convert to Fahrenheit</button>
//     </>
//   );
// }

// export default TemperatureConverter;

//  function TemperatureConverter(){
//    const [inputValue, setinputValue] = useState("");
//    const handleInputBtn = () =>{
//     console.log(inputValue)
//    }

//    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//      setinputValue(e.currentTarget.value);
//    };
//    <div>
//      <input onChange={handleChange} />{" "}
//      <button onClick={handleInputBtn}></button>;
//    </div>;
//  }

//  export default TemperatureConverter;

function TemperatureConverter() {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
  };

  const convertToFahrenheit = () => {
    const celsius = parseFloat(inputValue);
    const fahrenheit = (celsius * 9) / 5 + 32;
  };

  return (
    <div>
      <input
        type="number"
        value={inputValue}
        onChange={handleChange}
        placeholder="Enter Celsius"
      />
      <button onClick={convertToFahrenheit}>Convert</button>
    </div>
  );
}

export default TemperatureConverter;
