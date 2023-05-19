import '../styles/displayMovies.css'
import React, { useState, useEffect, useRef } from 'react';
import { useSwipeable } from "react-swipeable";
import Carousel from 'react-bootstrap/Carousel';
import MoviePopover from './MoviePopovers'

import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';

function DisplayMovies(props) {
  const [myMoviesObject, setMyMoviesObject] = useState({});
  const [displayedSlasherMovies, setDisplayedSlasherMovies] = useState(0);
  const [displayedCreatureMovies, setDisplayedCreatureMovies] = useState(0);
  const [displayedVampireMovies, setDisplayedVampireMovies] = useState(0);
  const [displayedHorrorComedyMovies, setDisplayedHorrorComedyMovies] = useState(0);

  useEffect(() => {
    if(typeof(props.movies.slasher) !== 'undefined' && typeof(props.movies.horrorComedy) !== 'undefined' ){
      setMyMoviesObject({
        'Slasher': props.movies.slasher.slasher,
        'Creature': props.movies.creature.creature,
        'Vampire': props.movies.vampire.vampire,
        'Horror_Comedy': props.movies.horrorComedy.horrorComedy,
      })
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
    console.log('the genre is '+genre+'. The direction is '+direction)
    if(genre === 'Slasher'){
      if(direction === 'left'){
        if (displayedSlasherMovies > 0) {
          setDisplayedSlasherMovies(displayedSlasherMovies - 1);
        }
      }
      if(direction === 'right'){
        if (displayedSlasherMovies < myMoviesObject.Slasher.length - 1) {
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
        if (displayedCreatureMovies < myMoviesObject.Creature.length - 1) {
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
        if (displayedVampireMovies < myMoviesObject.Vampire.length - 1) {
          setDisplayedVampireMovies(displayedVampireMovies + 1);
        }
    }}
    if(genre === 'Horror_Comedy'){
      if(direction === 'left'){
        if (displayedHorrorComedyMovies > 0) {
          setDisplayedHorrorComedyMovies(displayedHorrorComedyMovies - 1);
        }
      }
      if(direction === 'right'){
        if (displayedHorrorComedyMovies < myMoviesObject.Horror_Comedy.length - 1) {
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


  function Subgenre(props){
    let newVariable = Object.keys(myMoviesObject).includes(props.genreName) ? myMoviesObject[props.genreName] : null;
    let categoryTitle = props.genreName.replace('_', " ");
     try {
       if(newVariable != null) {
         return(
           <>   
            <div className='body'>
             <div className='category'>{categoryTitle}</div> 
             <div  {...props.handlers} >
                   <div className="my-container">
                   <button className='btn-left' onClick={() => handleScroll(props.genreName, 'left')} disabled={newVariable.displayNumber === 0}></button>
                     {newVariable.map((movie, index) => {
                       if (index >= props.displayedMovies && index < props.displayedMovies + 5) {
                         return (
                            <>
                            <div className='my-movies' key={movie.id}>
                            <MoviePopover props={movie} key={movie.id} moviePoster={movie.poster_path}/>        
                            </div>
                            </>
                         );
                       }
                       return null;
                     })}
                     <button className='btn-right'
                       onClick={() => handleScroll(props.genreName, 'right')}
                       disabled={props.displayedMovies >= newVariable.length - 5}
                     >
                   </button>
                 </div>
               </div> 
               </div>
             </>
         )}
     } catch (error) {
     }
   }

    return (
      <>
        <Subgenre genreName='Slasher' handlers={slasherHandlers}   displayedMovies={displayedSlasherMovies}  /> 
        <Subgenre genreName='Creature' handlers={creatureHandlers}   displayedMovies={displayedCreatureMovies}  /> 
        <Subgenre genreName='Vampire' handlers={vampireHandlers}   displayedMovies={displayedVampireMovies}  /> 
        <Subgenre genreName='Horror_Comedy' handlers={horrorComedyHandlers}   displayedMovies={displayedHorrorComedyMovies}  />  
      </>
    );
  }

export default DisplayMovies;