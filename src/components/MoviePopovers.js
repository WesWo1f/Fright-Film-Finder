import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import WatchProviders from './WatchProviders';
import MovieTrailers from './MovieTrailers';

function MoviePopover(movie) {
  function firstFourLetters(string) {
    const firstFour = string.substring(0, 4);
    return firstFour;
  }
  const popover = (
    <Popover id="popover-basic" >
      <Popover.Header as="h3">{movie.props.title}</Popover.Header>
      <Popover.Body >
        <div className='movie-overview'>{movie.props.overview}</div><br></br>
        <div className='release-date-and-vote-average'>
          <strong>Released: {firstFourLetters(movie.props.release_date)}</strong> <strong>Rating: { movie.props.vote_average}</strong>
        </div>
        <MovieTrailers movieId={movie.props.id} />
        <WatchProviders movieId={movie.props.id} />
      </Popover.Body>
    </Popover>
  );

  return (
    <>
      <OverlayTrigger trigger="click" rootClose={true} placement={"auto"} overlay={popover} >
        <Button style={{padding: 0,border:' none', background:' none'}}>  
        <img
            src={`https://image.tmdb.org/t/p/w500${movie.moviePoster}`}
            alt={movie.title}/>
        </Button>
      </OverlayTrigger>
    </>
  );
}

export default MoviePopover;


