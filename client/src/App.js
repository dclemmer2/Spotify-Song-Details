import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { Container, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap';
import axios from 'axios';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
// const REDIRECT_URI = "http://localhost:3000"
// const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"


function App() {
  const [accessToken, setAccessToken] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [songs, setSongs] = useState("");

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

  function searchSongs() {
      //First need to use the Search spotify endpoint to get the songs under the name that user inputs
      axios.get('https://api.spotify.com/v1/search?q=' + searchInput + '&type=track&limit=50&market=US', {
        headers: {
          'Authorization': 'Bearer ' + accessToken
        }
      })
      .then(response => {
        setSongs(response.data.tracks.items);
      })
      .catch(err => console.log(err));
      //Next 

      console.log(songs);
  }

  return (
    <div className="App m-5">
      <Container>
        <h1>Song Details</h1>
        <InputGroup className='mb-3' size='lg'>
          <FormControl
            placeholder='Search for Song/Band'
            type='input'
            onKeyPress={event => {
              if (event.key == "Enter") {
                searchSongs();
              }
            }}
            onChange={event => setSearchInput(event.target.value)}
          />
          <Button onClick={searchSongs}>
            Search
          </Button>
        </InputGroup>
      </Container>
      <Container>
        <Row className='mx-2 row row-cols-4'>
          {Array.isArray(songs) ?
          songs.map( (song, i) => {
            console.log(song);
            return (
              <Card>
                <Card.Img src={song.album.images[0].url} />
                <Card.Body>
                  <Card.Title>{song.name}</Card.Title>
                </Card.Body>
              </Card>
            )
          })
        : null
        }

        </Row>
      </Container>
    </div>
  );
}

export default App;
