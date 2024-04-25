import React, { useEffect, useState } from "react";
import Login from "./pages/Login";
import SongList from "./pages/musics/song.list";
import PlayList from "./pages/playList/playList.list";
import { Route, Routes } from "react-router-dom";
import {
  getPlaylistHandler,
  removeFromPlaylistHandler,
  addToPlaylistHandler,
} from "./apis/services";
import PageNotFound from "./pages/PageNotFound";
import Music from "./types/song.type";
import "./bootstrap.css";

function App() {
  const [playlist, setPlaylist] = useState<Music[]>([]);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const response = await getPlaylistHandler();
        setPlaylist(response.data);
      } catch (error) {
        console.log("Error occurred in getting playlist:", error);
      }
    };
    fetchPlaylist();
  }, []);

  const addToPlaylist = async (songId: string) => {
    try {
      const songExists = playlist.find((item) => item.songId === songId);
      if (songExists) {
        return alert("Song already exists in the playlist!");
      }
      const response = await addToPlaylistHandler(songId);
      setPlaylist(response.data);
    } catch (error) {
      console.log("Error while adding to playlist:", error);
    }
  };

  const removeFromPlaylist = async (songId: string) => {
    try {
      const response = await removeFromPlaylistHandler(songId);
      setPlaylist(response.data);
    } catch (error) {
      console.log("Error removing from playlist:", error);
    }
  };

  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/music"
          element={
            <SongList
              onRemoveFromPlaylist={removeFromPlaylist}
              addToPlaylist={addToPlaylist}
              playlist={playlist}
            />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/playlist"
          element={
            <PlayList
              playlist={playlist}
              onRemoveFromPlaylist={removeFromPlaylist}
            />
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
