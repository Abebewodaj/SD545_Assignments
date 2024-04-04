
import ReactDOM from "react-dom/client";
import "./index.css";


import RandomNumGenerator from "./homework03";
import CounterHomework from "./homework_Ques-01";
import TemperatureConverter from "./homework02";



const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <>
<CounterHomework />
<RandomNumGenerator />
< TemperatureConverter/>
</>
);
