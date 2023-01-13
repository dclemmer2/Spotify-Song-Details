import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function SongDetails({ song }) {
    const navigate = useNavigate();
    console.log(song);

    function msToTime(duration) {
        var seconds = Math.floor((duration / 1000) % 60),
            minutes = Math.floor((duration / (1000 * 60)) % 60),
            hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;

        return hours + ":" + minutes + ":" + seconds;
    }

    return (
        <div className='App m-md-5' >
            <Container>
                <h1>{song.name}</h1>

                <Row className='mx-2 row'>
                    <Col className='col-12 col-xl-6 col-lg-6 col-md-6'>
                        <img className='w-100' src={song.album.images[0].url}></img>
                    </Col>
                    <Col className='col-12 col-xl-6 col-lg-6 col-md-6'>
                        <iframe className='d-block' src={song.preview_url} title="W3Schools Free Online Web Tutorials"></iframe>
                        <p className='d-inline-block'>Song Length</p> <h5 className='d-inline-block'>{msToTime(song.duration_ms)}</h5>
                        <h5></h5><p>Artist/Band: {song.artists[0].name} </p>
                        <h5></h5><p>Release Date: {song.album.release_date}</p>
                        <h5></h5><p>Album Name: {song.album.name}</p>
                        <h5></h5><p>Link to Spotify in <a href={song.external_urls.spotify}>Browser</a> or in <a href={song.uri}>Desktop App</a></p>
                    </Col>
                </Row>
                <Button onClick={() => {
                    navigate("/");
                }}>Return to Search</Button>
            </Container>
        </div>

    );
}

export default SongDetails;