// newclient/src/App.js
import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import { getSpotifyAuthUrl } from "./spotify";
import "./App.css";

const moodIcons = {
  Happy: "😊",
  Sad: "😢",
  Chill: "😎"
};

function App() {
  const [moods, setMoods] = useState([]);
  const [selectedMood, setSelectedMood] = useState("");
  const [playlist, setPlaylist] = useState([]);
  const [spotifyToken, setSpotifyToken] = useState("");

  // Fetch moods from Firestore
  useEffect(() => {
    const fetchMoods = async () => {
      const querySnapshot = await getDocs(collection(db, "moods"));
      setMoods(querySnapshot.docs.map(doc => doc.data().name));
    };
    fetchMoods();
  }, []);

  // Capture Spotify token from URL after login
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const token = hash
        .substring(1)
        .split("&")
        .find(elem => elem.startsWith("access_token"))
        .split("=")[1];
      localStorage.setItem("spotifyToken", token);
      setSpotifyToken(token);
      window.location.hash = "";
    } else {
      const storedToken = localStorage.getItem("spotifyToken");
      if (storedToken) setSpotifyToken(storedToken);
    }
  }, []);

  // Generate playlist from Spotify based on selected mood
  const generatePlaylist = async () => {
    if (!selectedMood) return;
    if (!spotifyToken) {
      alert("Please login with Spotify first!");
      return;
    }

    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${selectedMood}&type=playlist&limit=3`,
        {
          headers: {
            Authorization: `Bearer ${spotifyToken}`,
          },
        }
      );

      const data = await response.json();
      const playlists = data.playlists.items.map(item => item.name);
      setPlaylist(playlists);
    } catch (error) {
      console.error("Error fetching playlists:", error);
      alert("Failed to fetch playlists. Make sure your Spotify token is valid.");
    }
  };

  return (
    <div className="container">
      <h1>Mood Playlist</h1>

      {!spotifyToken && (
        <button
          id="spotifyLogin"
          onClick={() => (window.location.href = getSpotifyAuthUrl())}
        >
          Login with Spotify
        </button>
      )}

      <div className="mood-buttons">
        {moods.map((mood, index) => (
          <button
            key={index}
            onClick={() => setSelectedMood(mood)}
            className={`${mood} ${selectedMood === mood ? "selected" : ""}`}
          >
            {moodIcons[mood]} {mood}
          </button>
        ))}
      </div>

      <button id="generateBtn" onClick={generatePlaylist}>
        Generate Playlist
      </button>

      <div id="playlist">
        {playlist.map((song, index) => (
          <div key={index} className="song">
            {song}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
