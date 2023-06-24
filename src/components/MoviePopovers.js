import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import WatchProviders from './WatchProviders';


function MoviePopover(movie) {
  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">{movie.props.title}</Popover.Header>
      <Popover.Body>
        <strong>{movie.props.overview}</strong><br></br>
        released: {movie.props.release_date} rating: { movie.props.vote_average}
        <WatchProviders movieId={movie.props.id}/>
      </Popover.Body>
    </Popover>
  );

  return (
    <>
      <OverlayTrigger trigger="click" rootClose={true} placement={"auto"} overlay={popover}>
        <Button>   <img
            src={`https://image.tmdb.org/t/p/w500${movie.moviePoster}`}
            alt={movie.title}/></Button>
      </OverlayTrigger>
    </>
  );
}

export default MoviePopover;


