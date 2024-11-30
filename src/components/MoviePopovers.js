import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import WatchProviders from './WatchProviders';
import MovieTrailers from './MovieTrailers';
import fetchMovieData from '../utils/fetchMovieData';
import { useState } from 'react';
import styled from "styled-components";

function MoviePopover(movie) {
  const [movieData, setMovieData] = useState(null);

  if(movieData !== null || movieData !== undefined){
    const popover = (
      
      <Popover id="popover-basic" >
        <Popover.Header as="header" style={{paddingBottom: '2px '}}>{movie.props.title}
        </Popover.Header>
        <Popover.Body >
        <MpaaYearRuntime>
          <span>{getMovieMPAARating(movieData)}  </span>•
          <span>{trimLetters(movieData?.popoverData?.release_date, 4)} </span>•
          <span>{runtimeFormat( movieData?.popoverData?.runtime)}</span>•
          <span><span className="fa fa-star checked" style={{ color: 'orange'}}></span> {trimLetters(movie.props.vote_average, 3)}</span>
        </MpaaYearRuntime>
        <LineDivider/>
          <div className='movie-overview'>{movie.props.overview}</div><br></br>
          <MovieTrailers movieData={movieData} />
          <WatchProviders movieData={movieData} />
        </Popover.Body>
      </Popover>
    );

    const handleClick = async () => {
      try {
        setMovieData(await fetchMovieData({movieId:movie.props.id}, 'moviepopover'));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    return (
      <>
        <OverlayTrigger trigger="click" rootClose={true} placement={"auto"} overlay={popover} >
          <Button style={{padding: 0,border:' none', background:' none'}} onClick={handleClick}>  
          <img
              src={`https://image.tmdb.org/t/p/w300${movie.moviePoster}`}
              alt={movie.title}/>
          </Button>
        </OverlayTrigger>
      </>
    );
  }
}

function trimLetters(string, length) {
  return string?.toString()?.slice(0, length);
}

function getMovieMPAARating(movieData) {
  if(movieData !== null && movieData !== undefined){
    const USA = movieData?.popoverData?.release_dates?.results?.find(result => result?.iso_3166_1 === "US");
    const rating = USA?.release_dates?.find(result => result?.certification !== '');
    if(!rating?.certification){
      return 'NR';
    }
    return rating?.certification;
  }
}

function runtimeFormat(runtime) {
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  return `${hours}h ${minutes}m`;
}

const LineDivider = styled.div`
  padding-top: -10px;
  margin-top: 0px;
  margin-bottom: 10px;
  border: 1px solid rgba(0, 0, 0, 0.5); 
  border-radius: 5px;
  margin-left: 10%;
  width: 80%;
`;

const MpaaYearRuntime = styled.div`
  padding-top: -5px;
  padding-bottom: 5px;
  color: black;
  font-size: 0.8rem;
  font-weight:700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px; 
`;

export default MoviePopover;


