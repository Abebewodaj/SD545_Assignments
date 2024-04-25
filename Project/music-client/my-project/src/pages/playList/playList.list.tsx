import React, { useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

import removeIcon from "../../images/playerIcons/dash-circle.svg";
import playIcon from "../../images/playerIcons/play-circle.svg";
import Music from "../../types/song.type";
import nextIcon from "../../images/playerIcons/skip-end-fill.svg";
import prevIcon from "../../images/playerIcons/skip-start-fill.svg";

import sliderIcon from "../../images/playerIcons/sliders.svg";
import shuffle from "../../images/playerIcons/shuffle.svg";
import playIconFill from "../../images/playerIcons/play-circle-fill.svg";
import volIcon from "../../images/playerIcons/volume-up-fill.svg";

interface Props {
  playlist: Music[];
  onRemoveFromPlaylist: (songId: string) => void;
}

export default function PlayList(props: Props) {
  const { playlist, onRemoveFromPlaylist } = props;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [currentSong, setCurrentSong] = useState<string | null>(null);
  const [currentSongTitle, setCurrentSongTitle] = useState<string | null>(null);
  const [currentSongIndex, setCurrentSongIndex] = useState<number | null>(null);

  const [isShuffleEnabled, setIsShuffleEnabled] = useState(false);
  const [shuffledPlaylist, setShuffledPlaylist] = useState<Music[]>([]);

  const playlistRemoveHandler = (songId: string) => {
    onRemoveFromPlaylist(songId);
  };

  const playButtonHandler = (
    songUrl: string,
    songTitle: string,
    index: number
  ) => {
    // setLoading(true);
    // setError(false);
    setCurrentSong(songUrl);
    setCurrentSongTitle(songTitle);
    setCurrentSongIndex(index);
    console.log("current song", currentSong);
  };

  // Function to shuffle the playlist
  const shufflePlaylist = () => {
    const shuffled = [...playlist].sort(() => Math.random() - 0.5);
    setShuffledPlaylist(shuffled);
  };

  // Function to toggle shuffle mode
  const toggleShuffle = () => {
    setIsShuffleEnabled((prev) => {
      if (!prev) {
        shufflePlaylist();
      }
      return !prev;
    });
  };

  // Modified playNextSong function to handle shuffle
  const playNextSong = () => {
    if (isShuffleEnabled) {
      const nextIndex = currentSongIndex !== null ? currentSongIndex + 1 : 0;
      if (nextIndex < shuffledPlaylist.length) {
        const nextSong = shuffledPlaylist[nextIndex];
        playButtonHandler(nextSong.urlPath, nextSong.title, nextIndex);
      } else {
        // Restart shuffle playlist
        const firstSong = shuffledPlaylist[0];
        playButtonHandler(firstSong.urlPath, firstSong.title, 0);
      }
    } else {
      if (currentSongIndex !== null) {
        const nextIndex = currentSongIndex + 1;
        if (nextIndex < playlist.length) {
          const nextSong = playlist[nextIndex];
          playButtonHandler(nextSong.urlPath, nextSong.title, nextIndex);
        } else {
          const firstSong = playlist[0];
          playButtonHandler(firstSong.urlPath, firstSong.title, 0);
        }
      }
    }
  };

  // Modified playPreviousSong function to handle shuffle
  const playPreviousSong = () => {
    if (isShuffleEnabled) {
      if (currentSongIndex !== null) {
        const previousIndex = currentSongIndex - 1;
        if (previousIndex >= 0) {
          const previousSong = shuffledPlaylist[previousIndex];
          playButtonHandler(
            previousSong.urlPath,
            previousSong.title,
            previousIndex
          );
        } else {
          // Move to the last song in the shuffle playlist
          const lastIndex = shuffledPlaylist.length - 1;
          const lastSong = shuffledPlaylist[lastIndex];
          playButtonHandler(lastSong.urlPath, lastSong.title, lastIndex);
        }
      }
    } else {
      if (currentSongIndex !== null) {
        const previousIndex = currentSongIndex - 1;
        if (previousIndex >= 0) {
          const previousSong = playlist[previousIndex];
          playButtonHandler(
            previousSong.urlPath,
            previousSong.title,
            previousIndex
          );
        } else {
          const lastIndex = playlist.length - 1;
          const lastSong = playlist[lastIndex];
          playButtonHandler(lastSong.urlPath, lastSong.title, lastIndex);
        }
      }
    }
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  return (
    <div>
      <div className="table bg-success p-2 text-dark bg-opacity-25 table-striped mt-4 ">
        <h3>Play List</h3>
        <table className="table  table-hover table-striped w-100 text-center ">
          <thead className="text-center">
            <tr>
              <th scope="col">Index</th>
              <th scope="col">Title</th>
              <th colSpan={2}>Action</th>
            </tr>
          </thead>
          <tbody>
            {playlist.map((song, index) => (
              <tr key={song.id}>
                <th scope="row">{index + 1}</th>
                <td>{song.title}</td>
                <td>
                  <button
                    className="btn p-0-m-0"
                    onClick={() => playlistRemoveHandler(song.songId)}
                  >
                    <img src={removeIcon} alt="RemoveFromPlaylist" />
                  </button>
                </td>
                <td>
                  <button
                    className="btn p-0-m-0"
                    onClick={() =>
                      playButtonHandler(song.urlPath, song.title, index)
                    }
                  >
                    <img src={playIcon} alt="Play" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className=" m-4 bg-secondary bg-gradient">
        {/* <div className="d-flex justify-content-between">
          <img src={sliderIcon} alt="slider" />
        </div>
 
        <div className="d-flex justify-content-between bg-gradient">
          <div className="text-left">
            <img src={shuffle} alt="shuffle" /> */}
        <div className=" m-4 bg-secondary bg-gradient">
          <div className="d-flex justify-content-between">
            <img src={sliderIcon} alt="slider" />
          </div>

          <div className="d-flex justify-content-between bg-gradient">
            <div className="text-left">
              <img src={shuffle} alt="shuffle" />
            </div>
            {/* <>center</> */}
            <div className="text-center d-flex justify-content-between">
              <div onClick={() => playPreviousSong()}>
                <img src={prevIcon} alt="prevMusic" />
              </div>
              <div>
                <div onClick={() => onplay}></div>
                <img src={playIcon} alt="AddToPlayList" />
              </div>

              <div onClick={() => playNextSong()}>
                <img src={nextIcon} alt="nextMusic" />
              </div>
            </div>
            <div className="text-right">
              <img src={volIcon} alt="volume" />
            </div>
          </div>
        </div>
      </div>
      {loading && (
        <div style={{ color: "green", font: "50px", fontWeight: "bold" }}>
          {currentSongTitle}
        </div>
      )}
      {/* {error && <div>Error loading audio</div>} */}
      {
        <AudioPlayer
          src={currentSong ? `http://localhost:9000/${currentSong}` : ""}
          autoPlay={true}
          onLoadStart={() => setLoading(true)}
          onPlay={() => setLoading(false)}
          onClickPrevious={playPreviousSong}
          onError={handleError}
          onClickNext={playNextSong}
        />
      }
      <div></div>
    </div>
  );
}
