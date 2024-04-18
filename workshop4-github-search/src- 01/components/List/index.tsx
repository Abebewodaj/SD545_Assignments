
import SearchReponse from '../../types/search-response';

import './index.css'
import User from '../../types/user';

type Props = {
  searchResponse:User[]
};
export default function List(props:Props) {
    const { searchResponse } = props;
   console.log(searchResponse);
    return (
      <div>
        {searchResponse.map((user) => (
          <div key={user.id}>
            <a href= {user.avatar_url} target="_blank"> <img src={user.avatar_url} style={{ width: "100px" }} /></a>
            <p className="card-text">{user.login}</p>
          </div>
        ))}
      </div>
    );
 
}