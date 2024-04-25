import React, {
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useState,
} from "react";
import logo from "../../images/logo.png";
import plusIcon from "../../images/playerIcons/plus-circle.svg";
import Music from "../../types/song.type";
import { getSongs } from "../../apis/services"; // refactor to default export
import { useNavigate } from "react-router-dom";
import PlayList from "../playList/playList.list";
type Props = {
  addToPlaylist: (songId: string) => void;
  playlist: Music[];
  onRemoveFromPlaylist: (songId: string) => void;
};
export default function SongList(props: Props) {
  const { addToPlaylist, playlist, onRemoveFromPlaylist } = props;
  const [songlist, setSonglist] = useState<Music[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSongList = async () => {
      try {
        const response = await getSongs();
        console.log("song list:", response.data);
        setSonglist(response.data);
      } catch (error) {
        console.error("Error fetching song list:", error);
      }
    };
    fetchSongList();
  }, []);
  const searchInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    // to be finished insie
    setSearchInput(e.target.value);
  };
  const keyDownHandler = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (searchInput.trim()) {
        const searchResponse = await getSongs(searchInput);
        //console.log('search result..',searchResponse.data);
        setSonglist(searchResponse.data);
        //inputRef.current!.value = '';
        setSearchInput("");
      } else {
        alert("Please enter a search keyword!"); //return
      }
    }
  };
  const logoutHandler = () => {
    localStorage.removeItem("accessToken"); //i. Remove the string from session storage(localStorage).
    navigate("/login");
  };
  return (
    <div>
      <div className="d-flex align-items-center justify-content-center  py-4 bg-body-tertiary">
        <img
          // className="mb-4 bg-body-tertiary"
          // src="/images/logo2.png"
          src={logo}
          alt="MIU logo"
          style={{ width: "100px" }}
        />

        <div className="input-group w-50 ">
          <input
            className="form-control bg-body-tertiary"
            onChange={searchInputHandler}
            onKeyDown={keyDownHandler}
            id="floatingInput"
            placeholder="Search"
          />
          {/* <label htmlFor="floatingInput">Search</label> */}
        </div>

        <button
          className="btn btn-primary btn-sm py-2 mt-3"
          style={{ marginLeft: "20%" }}
          onClick={logoutHandler}
          type="button"
        >
          LogOut{" "}
        </button>
      </div>
      <div className=" align-items-center justify-content-center  py-4 bg-body-tertiary">
        <div className="table bg-success p-2 text-dark bg-opacity-50  table-striped">
          <h3>Songs You May Interested</h3>
          <table className="table table-hover table-striped w-100 text-center">
            <thead>
              <tr>
                <th scope="col">Index</th>
                <th scope="col">Title</th>
                <th scope="col">ReleaseDate</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {songlist.map(
                (
                  song,
                  index // used index instead of id????
                ) => (
                  <tr key={song.id}>
                    <th>{index + 1}</th>
                    <td> {song.title}</td>
                    <td>{song.releaseDate}</td>
                    <td>
                      <button
                        className="btn p-0-m-0 circular-button"
                        onClick={() => addToPlaylist(song.id)}
                      >
                        <img src={plusIcon} alt="AddToPlayList" />
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
      <PlayList
        playlist={playlist}
        onRemoveFromPlaylist={onRemoveFromPlaylist}
      />
    </div>
  );
}
