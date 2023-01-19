import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import SearchSong from './Pages/SearchSong';
import SongDetails from './Pages/SongDetails';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
// const REDIRECT_URI = "http://localhost:3000"
// const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"


function App() {
  const [accessToken, setAccessToken] = useState("");
  const [song, setSong] = useState("");

  useEffect(() => {
    //API Access Token
    /*   axios.post('https://accounts.spotify.com/api/token', {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
      })
      .then(response => setAccessToken(response.data.access_token)) */
    var authParams = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
    }
    fetch('https://accounts.spotify.com/api/token', authParams)
      .then(result => result.json())
      .then(data => setAccessToken(data.access_token))
  }, [])


  //Pulls data from child element
  const pull_data = (song) => {
    setSong(song); 
  }

  return (
    <Routes>
      <Route path='/' element={<SearchSong func={pull_data} accessToken={accessToken} />} />
      <Route path='/songDetails' element={<SongDetails song={song} />} />
    </Routes>
  );
}

export default App;
