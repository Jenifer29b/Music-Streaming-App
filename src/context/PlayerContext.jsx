import axios from "axios";
import { createContext, useEffect, useRef, useState } from "react";
import data from "../Public/data.json";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
  const audioRef = useRef(null);
  const seekBg = useRef(null);
  const seekBar = useRef(null);

  const url = "http://localhost:4000";

  const [songsData, setSongsData] = useState([]);
  const [albumsData, setAlbumsData] = useState([]);
  const [track, setTrack] = useState(null);

  const [playerStatus, setPlayerStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: { second: 0, minute: 0 },
    totalTime: { second: 0, minute: 0 },
  });

  const [playlists, setPlaylists] = useState([]);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    setPlaylists(data.playlists);
    setSongs(data.songs);
  }, []);

  const createPlaylist = (name) => {
    const newPlaylist = {
      id: Date.now(),
      name,
      songs: [],
    };
    setPlaylists([...playlists, newPlaylist]);
  };

  const addSongToPlaylist = (playlistId, song) => {
    setPlaylists(
      playlists.map((playlist) => {
        if (playlist.id === playlistId) {
          return { ...playlist, songs: [...playlist.songs, song] };
        }
        return playlist;
      })
    );
  };

  const removeSongFromPlaylist = (playlistId, songId) => {
    setPlaylists(
      playlists.map((playlist) => {
        if (playlist.id === playlistId) {
          return {
            ...playlist,
            songs: playlist.songs.filter((song) => song.id !== songId),
          };
        }
        return playlist;
      })
    );
  };

  const [currentLikedSongId, setCurrentLikedSongId] = useState(null);

  const likeSong = (songId) => {
    setCurrentLikedSongId(songId);
  };

  const isSongLiked = (songId) => {
    return currentLikedSongId === songId;
  };

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
    const song = songsData.find((item) => id === item._id);
    if (song) {
      await setTrack(song);
      if (audioRef.current) {
        audioRef.current.play();
        setPlayerStatus(true);
      }
    }
  };

  const previous = async () => {
    const index = songsData.findIndex(
      (item) => track && track._id === item._id
    );
    if (index > 0) {
      await setTrack(songsData[index - 1]);
      if (audioRef.current) {
        audioRef.current.play();
        setPlayerStatus(true);
      }
    }
  };

  const next = async () => {
    const index = songsData.findIndex(
      (item) => track && track._id === item._id
    );
    if (index >= 0 && index < songsData.length - 1) {
      await setTrack(songsData[index + 1]);
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

  const getSongsData = async () => {
    try {
      const response = await axios.get(`${url}/api/song/list`);
      setSongsData(response.data.songs);
      setTrack(response.data.songs[0]);
    } catch (error) {
      console.error("Error fetching songs data:", error);
    }
  };

  const getAlbumsData = async () => {
    try {
      const response = await axios.get(`${url}/api/album/list`);
      setAlbumsData(response.data.albums);
    } catch (error) {
      console.error("Error fetching albums data:", error);
    }
  };

  const playloop = () => {
    if (audioRef.current) {
      audioRef.current.loop = true;
    }
  };

  // const addSongToPlaylist = (playlistId) => {
  //   if (!track) return;

  //   console.log("Attempting to add track to playlist:", playlistId, track);

  //   setPlaylists((prevPlaylists) => {
  //     const updatedPlaylists = prevPlaylists.map((playlist) =>
  //       playlist._id === playlistId
  //         ? { ...playlist, songs: [...playlist.songs, track] }
  //         : playlist
  //     );
  //     console.log("Updated playlists:", updatedPlaylists);
  //     return updatedPlaylists;
  //   });
  // };

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

  useEffect(() => {
    getSongsData();
    getAlbumsData();
  }, []);

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
    songsData,
    albumsData,
    addSongToPlaylist,
    playlists,
    songs,
    createPlaylist,
    removeSongFromPlaylist,
    currentLikedSongId,
    likeSong,
    isSongLiked,
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
