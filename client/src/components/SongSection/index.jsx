import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { SongCard } from "../SongCard";

export const Songsection = () => {
  const [songs, setSongs] = useState([]);
  const fetchSongs = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/v1/s3/songs");
      console.log(response.data);
      setSongs(response.data.songs);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-8">
        <Link to="/" className="text-2xl font-bold text-white hover:underline">
          Trending Songs
        </Link>
        <Link
          to="/"
          className="text-sm font-bold tracking-[2px] hover:underline"
        >
          Show all
        </Link>
      </div>
      <div className="horizontal-scroll grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {songs.map((song) => (
          <SongCard
            key={song._id}
            title={song.title}
            songUrl={song.songUrl}
            imageUrl={song.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};
