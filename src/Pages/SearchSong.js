import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { Container, InputGroup, FormControl, Button, Row, Card, Col } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SongResults({ accessToken, func }) {
    const [searchInput, setSearchInput] = useState("");
    const [songs, setSongs] = useState("");
    const navigate = useNavigate();

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
        <Container className='App m-md-5'>
            <h1 className='mb-4 title'>Song Spot</h1>
            <h5 className='grey-text'>Search for a song to display it's key details, such as the release date and album it is from.</h5>
            <h5 className='mb-5 grey-text'>All data is from the Spotify database.</h5>
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
            <Row className='mx-auto row'>

                {Array.isArray(songs) ?
                    songs.map((song, i) => {
                        //console.log(song);

                        return (
                            <Col className='col-6 col-xl-3 col-lg-3 col-md-4 col-sm-4'>
                                <Card className='mb-2' onClick={() => {
                                    //console.log(song);
                                    func(song);
                                    navigate("/songDetails");
                                }} key={song.id}>
                                    <Card.Img src={song.album.images[0].url} />
                                    <Card.Body>
                                        <Card.Title className='text-dark'>{song.name}</Card.Title>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    })
                    : null
                }
            </Row>
        </Container>
    );
}

export default SongResults;