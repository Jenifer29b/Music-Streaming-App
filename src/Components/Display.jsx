import React, { useContext, useEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import DisplayHome from "./DisplayHome";
import DisplayAlbum from "./DisplayAlbum";
import { PlayerContext } from "../context/PlayerContext";

const Display = () => {
  const { albumsData } = useContext(PlayerContext);

  const displayRef = useRef();
  const location = useLocation();
  const isAlbum = location.pathname.includes("album");
  const albumId = isAlbum ? location.pathname.split("/").pop() : "";

  // Determine the background color for the album or default
  const bgcolor =
    isAlbum && albumsData.length > 0
      ? albumsData.find((x) => x._id === albumId)?.bgColor || "#121212"
      : "#121212";

  useEffect(() => {
    if (displayRef.current) {
      displayRef.current.style.background = isAlbum
        ? `linear-gradient(${bgcolor}, #121212)`
        : "#121212";
    }
  }, [isAlbum, bgcolor]); // Add dependencies to control when the effect runs

  return (
    <div
      ref={displayRef}
      className="w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0"
    >
      {albumsData.length > 0 ? (
        <Routes>
          <Route path="/" element={<DisplayHome />} />
          <Route
            path="/album/:id"
            element={
              <DisplayAlbum album={albumsData.find((x) => x._id === albumId)} />
            }
          />
        </Routes>
      ) : (
        <p>Loading...</p> // Add a loading message or similar while data is being fetched
      )}
    </div>
  );
};

export default Display;
