

/* Create a React component for a length converter that allows users to enter a length in meters and converts it to feet when a button is clicked. 
 Use useState to manage the length input and output. */

import { ChangeEvent, useState } from "react";

 export default function LengthConverter () {
  const [meters,setmeters] = useState<number>(0);
    const [feet, setFeet] = useState<number>();

    const changeHandler = (e:ChangeEvent<HTMLInputElement>) => {
      console.log(typeof e)
           setmeters(parseFloat(e.target.value));
    }
   const converterHandler = () => {
      const toFee = (meters * 3.28084);
       setFeet(toFee);

   }
   return (
     <div>
      Meter:{meters}
       <input type="number" onChange={changeHandler} />
       <button onClick={converterHandler}>convert to feet</button>
      Feet: {feet}
     </div>
   );
    

 }