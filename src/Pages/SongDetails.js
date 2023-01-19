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
        <Container className='App m-md-5 mt-3' >
            <p className='mb-0 grey-text'>Song</p>
            <h1 className='mb-5 title'>{song.name}</h1>

            <Row className='mx-2 row'>
                <Col className='col-12 col-xl-6 col-lg-6 col-md-6'>
                    <img className='w-100' src={song.album.images[0].url}></img>
                </Col>
                <Col className='col-12 col-xl-6 col-lg-6 col-md-6'>
                    <p className='mb-0 grey-text'>Album Name</p>
                    <h5 className='mb-3'>{song.album.name}</h5>
                    <p className='mb-0 grey-text'>Artist/Band</p>
                    <h5 className='mb-3'>{song.artists[0].name}</h5>
                    <p className='mb-0 grey-text'>Song Length</p>
                    <h5 className='mb-3'>{msToTime(song.duration_ms)}</h5>
                    <p className='mb-0 grey-text'>Release Date</p>
                    <h5>{song.album.release_date}</h5>
                    <iframe src={song.preview_url} title="W3Schools Free Online Web Tutorials"></iframe>
                    <p id='previewSong' className='grey-text'>Preview of Song</p>
                    <h5></h5><p>Link to Spotify in <a href={song.external_urls.spotify}>Browser</a> or in <a href={song.uri}>Desktop App</a></p>
                </Col>
            </Row>
            <Button className='mt-4' onClick={() => {
                navigate("/");
            }}>Return to Search</Button>
        </Container>
    );
}

export default SongDetails;