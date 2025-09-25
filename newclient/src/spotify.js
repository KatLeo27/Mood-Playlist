// spotify.js

export const authEndpoint = "https://accounts.spotify.com/authorize";

// Read your environment variables
const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const redirectUri = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;

// Scopes define the permissions your app will request
const scopes = [
  "playlist-read-private",
  "playlist-read-collaborative",
];

// This function generates the Spotify login URL
export const getSpotifyAuthUrl = () => {
  return `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
    "%20"
  )}&response_type=token&show_dialog=true`;
};
