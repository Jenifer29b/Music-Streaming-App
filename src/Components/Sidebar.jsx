import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/frontend-assets/assets";
import { PlayerContext } from "../context/PlayerContext";
import { useContext } from "react";

const Sidebar = () => {
  const navigate = useNavigate();
  const { playlists, createPlaylist } = useContext(PlayerContext);
  const [showModal, setShowModal] = useState(false);
  const [playlistName, setPlaylistName] = useState("");

  const handleCreatePlaylist = () => {
    if (playlistName.trim() === "") {
      alert("Playlist name cannot be empty.");
      return;
    }
    createPlaylist(playlistName);
    setPlaylistName("");
    setShowModal(false);
  };
  return (
    <>
      <div className="w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex ">
        <div className="bg-[#121212] h-[15%] rounded flex flex-col justify-around">
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-3 pl-8 cursor-pointer"
          >
            <img className="w-6" src={assets.home_icon} alt="" />
            <p className="font-bold">Home</p>
          </div>
          <div className="flex items-center gap-3 pl-8 cursor-pointer">
            <img className="w-5" src={assets.search_icon} alt="" />
            <input
              type="search"
              placeholder="Search"
              className="bg-transparent"
              // onChange={handleSearch}
              // value={search}
            />
            <button className="font-bold bg-white text-black rounded w-20">
              Search
            </button>
          </div>
        </div>
        <div className="bg-[#121212] h-[85%] rounded">
          {/* Your Library Section */}
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img className="w-8" src={assets.stack_icon} alt="" />
              <p className="font-semibold">Your Library</p>
            </div>
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => setShowModal(true)}
            >
              <img className="w-5" src={assets.arrow_icon} alt="" />
              <img className="w-5" src={assets.plus_icon} alt="" />
            </div>
          </div>
          <button onClick={() => setShowModal(true)}>Create Playlist </button>
          {showModal && (
            <div className="modal">
              <input
                type="text"
                placeholder="Playlist Name"
                value={playlistName}
                className="bg-black text-white p-2 rounded"
                onChange={(e) => setPlaylistName(e.target.value)}
              />
              <button
                onClick={handleCreatePlaylist}
                className=" rounded m-2 bg-white text-black p-2"
              >
                Create
              </button>
              <button
                onClick={() => setShowModal(false)}
                className=" rounded m-2 bg-white text-black p-2"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
        <div>
          <h3>Your Playlists</h3>
          {playlists.map((playlist) => (
            <div key={playlist.id}>
              <p>{playlist.name}</p>
              {/* Optionally: Add UI for viewing or managing songs */}
            </div>
          ))}
        </div>

        <div className="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4 mt-4">
          <h1>Let's Findsome Podcasts to follow</h1>
          <p className="font-light">We'll keep you update on new episodes</p>
          <button className="px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4">
            Browse Podcasts
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
