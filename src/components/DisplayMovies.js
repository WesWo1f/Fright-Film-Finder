import '../styles/displayMovies.css'
import React, { useState, useEffect, useRef } from 'react';
import { useSwipeable } from "react-swipeable";
import MoviePopover from './MoviePopovers'

function DisplayMovies({movieObjects, searchObj}) {
  const [myMoviesObject, setMyMoviesObject] = useState();
  const [displayedSlasherMovies, setDisplayedSlasherMovies] = useState(0);
  const [displayedCreatureMovies, setDisplayedCreatureMovies] = useState(0);
  const [displayedVampireMovies, setDisplayedVampireMovies] = useState(0);
  const [displayedHorrorComedyMovies, setDisplayedHorrorComedyMovies] = useState(0);

  const decade = useRef()

  useEffect(() => {
    if(movieObjects !== undefined && movieObjects.length > 0){
      setMyMoviesObject(movieObjects)
    }
  });

  
  useEffect(() => {
    if(searchObj.decade !== decade.current){
      decade.current = searchObj.decade
      setDisplayedSlasherMovies(0)
      setDisplayedCreatureMovies(0)
      setDisplayedVampireMovies(0)
      setDisplayedHorrorComedyMovies(0)
    }
  })

  const handleScroll = (genre, direction) => {
    if(genre === 'slasher'){
      if(direction === 'left'){
        if (displayedSlasherMovies > 0) {
          setDisplayedSlasherMovies(displayedSlasherMovies - 1);
        }
      }
      if(direction === 'right'){
        if (displayedSlasherMovies < myMoviesObject[0].movieList.length - 1) {
          setDisplayedSlasherMovies(displayedSlasherMovies + 1);
        }
    }}
    if(genre === 'creature'){
      if(direction === 'left'){
        if (displayedCreatureMovies > 0) {
          setDisplayedCreatureMovies(displayedCreatureMovies - 1);
        }
      }
      if(direction === 'right'){
        if (displayedCreatureMovies < myMoviesObject[1].movieList.length - 1) {
          setDisplayedCreatureMovies(displayedCreatureMovies + 1);
        }
    }}
    if(genre === 'vampire'){
      if(direction === 'left'){
        if (displayedVampireMovies > 0) {
          setDisplayedVampireMovies(displayedVampireMovies - 1);
        }
      }
      if(direction === 'right'){
        if (displayedVampireMovies <  myMoviesObject[2].movieList.length - 1) {
          setDisplayedVampireMovies(displayedVampireMovies + 1);
        }
    }}

    if(genre === 'horrorComedy'){
      if(direction === 'left'){
        if (displayedHorrorComedyMovies > 0) {
          setDisplayedHorrorComedyMovies(displayedHorrorComedyMovies - 1);
          myMoviesObject[3].displayNumber -= 1
        }
      }
      if(direction === 'right'){
        if (displayedHorrorComedyMovies < myMoviesObject[3].movieList.length - 1) {
          setDisplayedHorrorComedyMovies(displayedHorrorComedyMovies + 1);
        }
      }
    }
  };

  const slasherHandlers = useSwipeable({
    onSwipedLeft: () => handleScroll('slasher', 'right'),
    onSwipedRight: () => handleScroll('slasher', 'left'),
  });
  const creatureHandlers = useSwipeable({
    onSwipedLeft: () => handleScroll('creature', 'right'),
    onSwipedRight: () => handleScroll('creature', 'left'),
  });
  const vampireHandlers = useSwipeable({
    onSwipedLeft: () => handleScroll('vampire','right'),
    onSwipedRight: () => handleScroll('vampire','left'),
  });
  const horrorComedyHandlers = useSwipeable({
    onSwipedLeft: () => handleScroll('horrorComedy','right'),
    onSwipedRight: () => handleScroll('horrorComedy','left'),
  });


    function MovieList(props) {
      const myGenre = myMoviesObject.find(element => element.genreName === props.genreName)

     if(myGenre !== undefined){
        const result = props.genreName.replace(/([A-Z])/g, " $1");
        const categoryTitle = result.charAt(0).toUpperCase() + result.slice(1);
      return (
        <>
        <div className='body'>
          <div className='category'>{categoryTitle}</div> 
                <div  {...props.handlers} >
                    <div className="my-container">
                    <button className='btn-left' onClick={() => handleScroll(props.genreName, 'left')} disabled={myGenre.movieList.displayNumber === 0}></button>
                    {myGenre.movieList.map(function(movie, index) {
                       if (index >= props.displayedMovies && index < props.displayedMovies + 5) {
                      return(
                        <div className='my-movies' style={{width: '100%'}} key={movie.id}>
                          <li key={movie.id}>
                            <MoviePopover props={movie} moviePoster={movie.poster_path} />
                          </li>
                        </div>
                      )} 
                    })}
                      <button className='btn-right'
                          onClick={() => handleScroll(props.genreName, 'right')}
                          disabled={props.displayedMovies >= myGenre.movieList.length - 5}
                        >
                      </button>
                    </div>
            </div>
          </div>
        </>
      )
    }
  }

  if(myMoviesObject !== undefined){
    return (
      <>
      <MovieList genreName='slasher' handlers={slasherHandlers}   displayedMovies={displayedSlasherMovies}/>
      <MovieList genreName='creature' handlers={creatureHandlers}   displayedMovies={displayedCreatureMovies}/>
      <MovieList genreName='vampire' handlers={vampireHandlers}   displayedMovies={displayedVampireMovies} />
      <MovieList genreName='horrorComedy' handlers={horrorComedyHandlers}   displayedMovies={displayedHorrorComedyMovies} />
      </>
    );
  }
  }

export default DisplayMovies;