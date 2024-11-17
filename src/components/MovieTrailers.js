import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import fetchMovieData from '../utils/fetchMovieData';

function MovieTrailers(movieId) {
    const [youtubeUrl, setYoutubeUrl] = useState('');
    const [movieTrailersData, setMovieTrailersData] = useState(null);

    useEffect(() => {
        async function callFetchMovieData() {
            if(!movieTrailersData || movieTrailersData === undefined) {
                setMovieTrailersData(await fetchMovieData(movieId, 'trailer'));
            }
        }
        async function movieTrailerCall() {
            if (movieTrailersData?.trailerData?.length > 0) {
                const trailer = movieTrailersData.trailerData.find(trailer => trailer.type === "Trailer");
                if (trailer) {
                    const url = `https://www.youtube.com/watch?v=${trailer.key}`;
                    setYoutubeUrl(url);
                } else {
                    console.log('No trailer found');
                }
            }
        }
        if(movieTrailersData) {
            movieTrailerCall();
        }
        callFetchMovieData();
    }, [movieId, movieTrailersData]);

    const handleButtonClick = () => {
        if (youtubeUrl) {
            window.open(youtubeUrl);
        } else {
            console.log('No YouTube URL available');
        }
    };

    return (
        <div>
            <ButtonStyle onClick={handleButtonClick} disabled={!youtubeUrl}>
                Play Trailer
            </ButtonStyle>
        </div>
    );
}

const ButtonStyle = styled.button`
    margin-top: 8px;
    margin-bottom: 8px;
    color: white;
    border: none;
    border-style: none;
    border-radius: 5px;
    font-style: normal;
    font-size: 1.2em;
    background-color: #ab0c0c !important;
    &:hover {
        box-shadow: 0 0 10px 1px red;
        background-color: #6D071A;
    }
`;

export default MovieTrailers;