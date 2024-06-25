import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Upload = () => {
  const [songFile, setSongFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [songName, setSongName] = useState("");

  const handleSongFileChange = (e) => {
    setSongFile(e.target.files[0]);
  };

  const handleImageFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSongNameChange = (e) => {
    setSongName(e.target.value);
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!songFile || !imageFile) {
      alert("Select both audio and image files!");
      return;
    }

    const formData = new FormData();
    formData.append("song", songFile);
    formData.append("image", imageFile);
    formData.append("name", songName);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3001/api/v1/s3/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/");
      console.log(`Song uploaded successfully: ${response.data}`);
    } catch (error) {
      console.error("Error uploading song:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <div className="w-full max-w-md mx-auto p-8 bg-gray-800 rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <img
            src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
            alt="Spotify Logo"
            className="w-32 mx-auto"
          />
          <h1 className="text-3xl font-bold mt-4">Upload Song</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium">Upload Audio</label>
            <input
              type="file"
              onChange={handleSongFileChange}
              className="w-full p-3 mt-1 text-black rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Upload Image</label>
            <input
              type="file"
              onChange={handleImageFileChange}
              className="w-full p-3 mt-1 text-black rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Song Title</label>
            <input
              type="text"
              onChange={handleSongNameChange}
              className="w-full p-3 mt-1 text-black rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <button
            type="submit"
            className="w-full p-3 mt-4 bg-green-600 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
