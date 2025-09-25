import { useEffect, useState } from 'react';

function App() {
  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/get-playlist')
      .then(res => res.json())
      .then(data => setPlaylist(data));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Mood Playlist</h1>
      {playlist.map((song, index) => (
        <div key={index} style={{ marginBottom: '10px', border: '1px solid #ccc', padding: '10px' }}>
          <img src={song.albumArt} alt={song.title} width="50" height="50" />
          <div>{song.title} - {song.artist}</div>
        </div>
      ))}
    </div>
  );
}

export default App;
