// newclient/src/App.js
import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
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

  useEffect(() => {
    const fetchMoods = async () => {
      const querySnapshot = await getDocs(collection(db, "moods"));
      setMoods(querySnapshot.docs.map(doc => doc.data().name));
    };
    fetchMoods();
  }, []);

  const generatePlaylist = () => {
    if (!selectedMood) return;
    const dummyPlaylist = [
      `${selectedMood} Song 1`,
      `${selectedMood} Song 2`,
      `${selectedMood} Song 3`
    ];
    setPlaylist(dummyPlaylist);
  };

  return (
    <div className="container">
      <h1>Mood Playlist</h1>

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
