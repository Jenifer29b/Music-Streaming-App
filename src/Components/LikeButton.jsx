import React, { useContext } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { PlayerContext } from "../context/PlayerContext";

const LikeButton = ({ songId }) => {
  const { currentLikedSongId, likeSong, isSongLiked } =
    useContext(PlayerContext);
  const liked = isSongLiked(songId);

  const handleClick = () => {
    if (!liked) {
      likeSong(songId); // Set this song as liked
    } else {
      likeSong(null); // Unset the liked song if the same song is clicked
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center justify-center p-2 rounded-full transition-colors duration-200 ${
        liked ? "text-red-500" : "text-gray-500"
      }`}
    >
      {liked ? <FaHeart /> : <FaRegHeart />}
    </button>
  );
};

export default LikeButton;
