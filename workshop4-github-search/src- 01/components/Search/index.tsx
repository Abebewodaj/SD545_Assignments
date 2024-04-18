import axios from "axios";
import { ChangeEvent, useEffect, useRef, useState } from "react"
import User from "../../types/user";
import SearchReponse from "../../types/search-response";
type Props = {
  onSetSearchResponse: (value: User[]) => void; // function sets search Response to searchResponse state i.e in the App, to display result of searchResponse state in the List Component!
};

export default function Search(props:Props) {
   const { onSetSearchResponse } = props;
  const [keyword, setKeyword] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const search = async () => {
    const response = await axios.get( `https://api.github.com/search/users?q=${keyword}` );
        // const response = await axios.get( `https://api.github.com/search/users?q=${inputRef.current!.value}` );

    if(response.status === 200){
        onSetSearchResponse(response.data.items);
    }
    else{
        //error
    }
  };

  return (
    <section className="jumbotron">
      <h3 className="jumbotron-heading">Search Github Users</h3>
      <div>
        <input type="text"  placeholder="enter the name you search"  value={keyword} onChange={(e: ChangeEvent<HTMLInputElement>) =>setKeyword(e.target.value) }/>
       {/* <input type="text"  placeholder="enter the name you search" ref={inputRef}/> */}

        &nbsp;
        <button onClick={search}>Search</button>
      </div>
    </section>
  );
}
