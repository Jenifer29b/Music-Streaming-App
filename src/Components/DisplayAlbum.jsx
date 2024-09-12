import { useParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import Navebar from "./Navebar";
import { assets } from "../assets/frontend-assets/assets";
import { PlayerContext } from "../context/PlayerContext";

const DisplayAlbum = () => {
  const { id } = useParams();
  const [albumData, setAlbumData] = useState(null);
  const { playWithId, albumsData, songsData } = useContext(PlayerContext);

  useEffect(() => {
    if (albumsData && id) {
      const foundAlbum = albumsData.find((item) => item.id === id);
      setAlbumData(foundAlbum);
    }
  }, [albumsData, id]);

  if (!albumData) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Navebar />
      <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
        <img
          className="w-48 rounded"
          src={albumData.image}
          alt={albumData.name}
        />
        <div className="flex flex-col">
          <p>Playlists</p>
          <h2 className="text-5xl font-bold mb-4 md:text-7xl">
            {albumData.name}
          </h2>
          <h4>{albumData.desc}</h4>
          <p className="mt-1">
            <img
              className="inline-block w-5"
              src={assets.spotify_logo}
              alt="Spotify Logo"
            />
            <b>Spotify</b>. 132315 Likes .. <b>50 Songs</b> about 2hrs 30 min
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
        <p>
          <b className="mr-4">#</b>Title
        </p>
        <p>Album</p>
        <p className="hidden sm:block">Date Added</p>
        <img className="m-auto w-4" src={assets.clock_icon} alt="Clock Icon" />
      </div>
      <hr />
      {songsData
        .filter((item) => item.album === albumData.name)
        .map((item, index) => (
          <div
            onClick={() => playWithId(item._id)}
            key={item._id}
            className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer"
          >
            <p className="text-white">
              <b className="mr-4 text-[#a7a7a7]"> {index + 1}</b>
              <img
                className="inline w-10 mr-5"
                src={item.image}
                alt={item.name}
              />
              {item.name}
            </p>
            <p className="text-[15px]">{albumData.name}</p>
            <p className="text-[15px] hidden sm:block">5 Days Ago</p>
            <p className="text-[15px] text-center">{item.duration}</p>
          </div>
        ))}
    </>
  );
};

export default DisplayAlbum;
