import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/frontend-assets/assets";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
  const audioRef = useRef(null);
  const seekBg = useRef(null);
  const seekBar = useRef(null);

  const [track, setTrack] = useState(songsData[0]); // Initialize as null
  const [playerStatus, setPlayerStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: {
      second: 0,
      minute: 0,
    },
    totalTime: {
      second: 0,
      minute: 0,
    },
  });

  const play = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setPlayerStatus(true);
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setPlayerStatus(false);
    }
  };

  const playWithId = async (id) => {
    if (songsData[id]) {
      await setTrack(songsData[id]);
      if (audioRef.current) {
        audioRef.current.play();
        setPlayerStatus(true);
      }
    }
  };

  const previous = async () => {
    if (track.id > 0) {
      await setTrack(songsData[track.id - 1]);
      if (audioRef.current) {
        audioRef.current.play();
        setPlayerStatus(true);
      }
    }
  };

  const next = async () => {
    if (track.id < songsData.length - 1) {
      await setTrack(songsData[track.id + 1]);
      if (audioRef.current) {
        audioRef.current.play();
        setPlayerStatus(true);
      }
    }
  };

  const seekSong = (e) => {
    if (audioRef.current && seekBg.current) {
      audioRef.current.currentTime =
        (e.nativeEvent.offsetX / seekBg.current.offsetWidth) *
        audioRef.current.duration;
    }
  };

  const shuffleSong = async () => {
    if (songsData.length > 0) {
      const randomIndex = Math.floor(Math.random() * songsData.length);
      await setTrack(songsData[randomIndex]);
      if (audioRef.current) {
        audioRef.current.play();
        setPlayerStatus(true);
      }
    }
  };

  const downloadSong = () => {
    alert("Song Downloading Started ....");
  };

  const increaseVolume = () => {
    if (audioRef.current) {
      audioRef.current.volume = Math.min(audioRef.current.volume + 0.2, 1.0);
      alert("Volume Increased");
    }
  };

  const playloop = () => {
    if (audioRef.current) {
      audioRef.current.loop = true;

      // // Start playback if not already playing
      // if (audioRef.current.paused) {
      //   audioRef.current.play().catch((error) => {
      //     console.error("Error trying to play the audio:", error);
      //   });
      // }
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      const handleTimeUpdate = () => {
        if (audioRef.current) {
          const currentTime = Math.floor(audioRef.current.currentTime);
          const duration = Math.floor(audioRef.current.duration);
          seekBar.current.style.width = (currentTime / duration) * 100 + "%";
          setTime({
            currentTime: {
              second: currentTime % 60,
              minute: Math.floor(currentTime / 60),
            },
            totalTime: {
              second: duration % 60,
              minute: Math.floor(duration / 60),
            },
          });
        }
      };

      audioRef.current.ontimeupdate = handleTimeUpdate;
    }
  }, [audioRef.current]);

  const contextValue = {
    audioRef,
    seekBg,
    seekBar,
    track,
    setTrack,
    playerStatus,
    setPlayerStatus,
    time,
    setTime,
    play,
    pause,
    playWithId,
    previous,
    next,
    seekSong,
    shuffleSong,
    downloadSong,
    increaseVolume,
    playloop,
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
