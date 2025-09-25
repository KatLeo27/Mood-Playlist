const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 5000;

const dummyPlaylist = [
  { title: "Song 1", artist: "Artist A", albumArt: "https://via.placeholder.com/100" },
  { title: "Song 2", artist: "Artist B", albumArt: "https://via.placeholder.com/100" }
];

app.get('/get-playlist', (req, res) => {
  res.json(dummyPlaylist);
});

app.post('/save-playlist', (req, res) => {
  const newPlaylist = req.body;
  const data = JSON.parse(fs.readFileSync('playlists.json'));
  data.push(newPlaylist);
  fs.writeFileSync('playlists.json', JSON.stringify(data));
  res.send({ status: 'ok' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
