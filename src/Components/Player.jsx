import React from "react";
import { assets } from "../assets/frontend-assets/assets";
import { PlayerContext } from "../context/PlayerContext";
import { useContext } from "react";
import { useState } from "react";
import LikeButton from "./LikeButton";

const Player = () => {
  const {
    track,
    seekBg,
    seekBar,
    playerStatus,
    play,
    pause,
    time,
    previous,
    next,
    seekSong,
    shuffleSong,
    downloadSong,
    increaseVolume,
    playloop,
    addSongToPlaylist,
    playlists,
  } = useContext(PlayerContext);

  const [showPlaylistMenu, setShowPlaylistMenu] = useState(false);

  const handleAddToPlaylist = (playlistId) => {
    try {
      console.log("Adding to playlist:", playlistId, track);
      addSongToPlaylist(playlistId);
      setShowPlaylistMenu(false);
      alert("Song added to playlist successfully!");
    } catch (error) {
      console.log("Error adding song to playlist:", error);
    }
  };

  return track ? (
    <div className="h-[10%] bg-black flex justify-between items-center text-white px-4">
      <div className="hidden lg:flex items-center gap-4">
        <img className="w-12" src={track.image} alt="" />
        <div>
          <p>{track.name}</p>
          <p>{track.desc.slice(0, 12)}</p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-1 m-auto">
        <div className="flex gap-4">
          <img
            onClick={() => shuffleSong()}
            className="w-4 cursor-pointer"
            src={assets.shuffle_icon}
            alt=""
          />
          <img
            onClick={() => previous()}
            className="w-4 cursor-pointer"
            src={assets.prev_icon}
            alt=""
          />
          {playerStatus ? (
            <img
              onClick={pause}
              className="w-4 cursor-pointer"
              src={assets.pause_icon}
              alt=""
            />
          ) : (
            <img
              onClick={play}
              className="w-4 cursor-pointer"
              src={assets.play_icon}
              alt=""
            />
          )}
          <img
            onClick={() => next()}
            className="w-4 cursor-pointer"
            src={assets.next_icon}
            alt=""
          />
          <img
            onClick={() => playloop()}
            className="w-4 cursor-pointer"
            src={assets.loop_icon}
            alt=""
          />
          <img
            onClick={() => downloadSong(track.filename)}
            className="w-4 cursor-pointer"
            src="https://archive.org/download/download-png/dl.png"
            alt=""
          />
        </div>

        <div className="flex items-center gap-5">
          <p>
            {time.currentTime.minute}:{time.currentTime.second}
          </p>
          <div
            onClick={seekSong}
            ref={seekBg}
            className="w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer"
          >
            <hr
              ref={seekBar}
              className="h-1 border-none w-0 bg-green-800 rounded-full"
            />
          </div>
          <p>
            {time.totalTime.minute}:{time.totalTime.second}
          </p>
          <LikeButton songId={track.id} />
          <button
            onClick={() => setShowPlaylistMenu(!showPlaylistMenu)}
            className="w-4 cursor-pointer"
          >
            + Playlist
          </button>
          {showPlaylistMenu && (
            <div className="absolute bg-gray-800 p-2 rounded">
              <h3 className="text-white">Add to Playlist</h3>
              {playlists.map((playlist) => (
                <div
                  key={playlist._id}
                  className="cursor-pointer text-white"
                  onClick={() => handleAddToPlaylist(playlist._id)}
                >
                  {playlist.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="hidden lg:flex items-center gap-2 opacity-75">
        <img className="w-4" src={assets.plays_icon} alt="" />
        <img className="w-4" src={assets.mic_icon} alt="" />
        <img className="w-4" src={assets.queue_icon} alt="" />
        <img className="w-4" src={assets.speaker_icon} alt="" />
        <img
          onClick={() => increaseVolume()}
          className="w-4 cursor-pointer"
          src={assets.volume_icon}
          alt=""
        />
        <div className="w-20 bg-slate-50 h-1 rounded"></div>
        <img className="w-4" src={assets.mini_player_icon} alt="" />
        <img className="w-4" src={assets.zoom_icon} alt="" />
      </div>
    </div>
  ) : null;
};

export default Player;
