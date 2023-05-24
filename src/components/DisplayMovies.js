import '../styles/displayMovies.css'
import React, { useState, useEffect, useRef } from 'react';
import { useSwipeable } from "react-swipeable";
import MoviePopover from './MoviePopovers'

function DisplayMovies(props) {
  const [myMoviesObject, setMyMoviesObject] = useState();
  const [displayedSlasherMovies, setDisplayedSlasherMovies] = useState(0);
  const [displayedCreatureMovies, setDisplayedCreatureMovies] = useState(0);
  const [displayedVampireMovies, setDisplayedVampireMovies] = useState(0);
  const [displayedHorrorComedyMovies, setDisplayedHorrorComedyMovies] = useState(0);

  useEffect(() => {
    if(typeof(props.movies.slasher) !== 'undefined' && typeof(props.movies.horrorComedy) !== 'undefined' ){
      setMyMoviesObject([
            {"genre" : "Slasher",
            'MovieList' : props.movies.slasher.slasher,
            'displayNumber': 0
            },
            {"genre" : "Creature",
              'MovieList' :props.movies.creature.creature,
              'displayNumber': 0
            },
            {"genre" : "Vampire",
              'MovieList' :props.movies.vampire.vampire,
              'displayNumber': 0
            },
            {"genre" : "Horror_Comedy",
              'MovieList' : props.movies.horrorComedy.horrorComedy,
              'displayNumber': 0
            },
      ])
    }
  }, [props.movies]);

  // useEffect(() => {
  //   if(typeof(props.movies.genre) !== "undefined"){
  //     try {
  //       if(props.movies.genre.name === 'Slasher'){
  //         slasherListRef.current.scrollIntoView({ behavior: "smooth",block: "nearest"})
  //       }
  //       if(props.movies.genre.name === 'Creature'){
  //         creatureListRef.current.scrollIntoView({ behavior: "smooth",block: "nearest"})
  //       }
  //       if(props.movies.genre.name === 'Vampire'){
  //         vampireListRef.current.scrollIntoView({ behavior: "smooth",block: "nearest"})
  //       }
  //       if(props.movies.genre.name === 'Horror Comedy'){
  //         horrorComedyListRef.current.scrollIntoView({ behavior: "smooth", block: "nearest"})
  //       }
  //     } catch (error) {
  //   }}
  // }, [props.movies.genre])

  const handleScroll = (genre, direction) => {
    //console.log('the genre is '+genre+'. The direction is '+direction)
    if(genre === 'Slasher'){
      if(direction === 'left'){
        if (displayedSlasherMovies > 0) {
          setDisplayedSlasherMovies(displayedSlasherMovies - 1);
        }
      }
      if(direction === 'right'){
        if (displayedSlasherMovies < myMoviesObject[0].MovieList.length - 1) {
          setDisplayedSlasherMovies(displayedSlasherMovies + 1);
        }
    }}
    if(genre === 'Creature'){
      if(direction === 'left'){
        if (displayedCreatureMovies > 0) {
          setDisplayedCreatureMovies(displayedCreatureMovies - 1);
        }
      }
      if(direction === 'right'){
        if (displayedCreatureMovies < myMoviesObject[1].MovieList.length - 1) {
          setDisplayedCreatureMovies(displayedCreatureMovies + 1);
        }
    }}
    if(genre === 'Vampire'){
      if(direction === 'left'){
        if (displayedVampireMovies > 0) {
          setDisplayedVampireMovies(displayedVampireMovies - 1);
        }
      }
      if(direction === 'right'){
        if (displayedVampireMovies <  myMoviesObject[2].MovieList.length - 1) {
          setDisplayedVampireMovies(displayedVampireMovies + 1);
        }
    }}

    if(genre === 'Horror_Comedy'){
      if(direction === 'left'){
        if (displayedHorrorComedyMovies > 0) {
          setDisplayedHorrorComedyMovies(displayedHorrorComedyMovies - 1);
          myMoviesObject[3].displayNumber -= 1
        }
      }
      if(direction === 'right'){
        if (displayedHorrorComedyMovies < myMoviesObject[3].MovieList.length - 1) {
          setDisplayedHorrorComedyMovies(displayedHorrorComedyMovies + 1);
        }
      }
    }
  };

  const slasherHandlers = useSwipeable({
    onSwipedLeft: () => handleScroll('Slasher', 'right'),
    onSwipedRight: () => handleScroll('Slasher', 'left'),
  });
  const creatureHandlers = useSwipeable({
    onSwipedLeft: () => handleScroll('Creature', 'right'),
    onSwipedRight: () => handleScroll('Creature', 'left'),
  });
  const vampireHandlers = useSwipeable({
    onSwipedLeft: () => handleScroll('Vampire','right'),
    onSwipedRight: () => handleScroll('Vampire','left'),
  });
  const horrorComedyHandlers = useSwipeable({
    onSwipedLeft: () => handleScroll('Horror_Comedy','right'),
    onSwipedRight: () => handleScroll('Horror_Comedy','left'),
  });


    function MovieList(props) {
      function checkingForNull(){
      if(myMoviesObject !== null && typeof(myMoviesObject) !== 'undefined'){
        for (let index = 0; index < myMoviesObject.length; index++) {
          const element = myMoviesObject[index];
          if(element.genre === props.genreName){
            if(typeof(element.MovieList) !== 'undefined'){
              return element.MovieList
            }
        }}
      }}
    if(typeof(checkingForNull()) !== 'undefined'){
      const myMovieList = checkingForNull()
      let categoryTitle = props.genreName.replace('_', " ");
      return (
        <>
        <div className='body'>
          <div className='category'>{categoryTitle}</div> 
                <div  {...props.handlers} >
                    <div className="my-container">
                    <button className='btn-left' onClick={() => handleScroll(props.genreName, 'left')} disabled={myMovieList.displayNumber === 0}></button>
                    {myMovieList.map(function(movie, index) {
                       if (index >= props.displayedMovies && index < props.displayedMovies + 5) {
                      return(
                        <div className='my-movies'key={movie.id}>
                          <li key={movie.id}>
                            <MoviePopover props={movie} moviePoster={movie.poster_path} />
                          </li>
                        </div>
                      )} 
                    })}
                      <button className='btn-right'
                          onClick={() => handleScroll(props.genreName, 'right')}
                          disabled={props.displayedMovies >= myMovieList.length - 5}
                        >
                      </button>
                    </div>
            </div>
          </div>
        </>
      )
    }
  }

    return (
      <>
      <MovieList genreName='Slasher' handlers={slasherHandlers}   displayedMovies={displayedSlasherMovies}/>
      <MovieList genreName='Creature' handlers={creatureHandlers}   displayedMovies={displayedCreatureMovies}/>
      <MovieList genreName='Vampire' handlers={vampireHandlers}   displayedMovies={displayedVampireMovies} />
      <MovieList genreName='Horror_Comedy' handlers={horrorComedyHandlers}   displayedMovies={displayedHorrorComedyMovies} />
      </>
    );
  }

export default DisplayMovies;