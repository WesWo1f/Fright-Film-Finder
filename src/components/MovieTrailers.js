import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

function MovieTrailers({movieData}) {
    const [youtubeUrl, setYoutubeUrl] = useState(null);
    useEffect(() => {
        const movieTrailersData = movieData?.popoverData?.videos?.results?.find(trailer => trailer.type === "Trailer");

        if(movieTrailersData?.key !== undefined && movieTrailersData?.key !== null){
            setYoutubeUrl(`https://www.youtube.com/watch?v=${movieTrailersData.key}`);
        }

    }, [movieData]);

    const handleButtonClick = () => {
        if (youtubeUrl) {
            window.open(youtubeUrl);
        } else {
            console.log('No YouTube URL available');
        }
    };

    return (
       <div>
          { youtubeUrl ? <ButtonStyle onClick={handleButtonClick} disabled={!youtubeUrl}>
                Play Trailer
            </ButtonStyle> : "No Trailer Available" }
        </div>
    );
}

const ButtonStyle = styled.button`
    padding: 4px 12px 4px 12px;
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