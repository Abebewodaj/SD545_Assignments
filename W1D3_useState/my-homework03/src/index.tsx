import ReactDOM from "react-dom/client";
import "./index.css";

import RandomNumGenerator from "./homework-Ques03";
import CounterHomework from "./homework_Ques-01";
import TemperatureConverter from "./homework-Ques02";
import Homework01 from "./homework_Ques-01";
import LengthConverter from "./lengthConverter";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <>
    {/* <CounterHomework /> */}
    {/* <RandomNumGenerator /> */}
    {/* < TemperatureConverter/> */}
    {/* <Homework01 /> */}
    {/* <TemperatureConverter/> */}
    {/* <RandomNumGenerator /> */}
    <LengthConverter />
  </>
);
