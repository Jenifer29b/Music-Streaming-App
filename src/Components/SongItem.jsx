import React, { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";

const SongItem = ({ name, image, desc, id }) => {
  const { playWithId } = useContext(PlayerContext);

  return (
    <div
    //   className="grid 
    // grid-cols-2 
    // sm:grid-cols-3 
    // md:grid-cols-3 
    // lg:grid-cols-5 
    // gap-6"
    >
      <div
        onClick={() => playWithId(id)}
        className="w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]"
      >
        <img
          className="max-w-[200px] h-[180px] object-cover rounded"
          src={image}
          alt=""
        />

        <p className="font-bold mt-2 mb-1">{name}</p>
        <p className="text-slate-200 text-sm">{desc}</p>
      </div>
    </div>
  );
};

export default SongItem;
