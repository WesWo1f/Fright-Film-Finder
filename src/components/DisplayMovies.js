import '../styles/displayMovies.css'
import React, { useState, useEffect, useRef } from 'react';
import { useSwipeable } from "react-swipeable";
import MoviePopover from './MoviePopovers'

function DisplayMovies({movieObjects, searchObj}) {
  const [myMoviesObject, setMyMoviesObject] = useState();
  const decade = useRef()

  useEffect(() => {
    if(movieObjects !== undefined && movieObjects.length > 0){
      if(movieObjects !== myMoviesObject){
        setMyMoviesObject(movieObjects)
      }
    }
    if(searchObj.decade !== decade.current){
      decade.current = searchObj.decade
    }
  });
  useEffect(()=>{
    if(searchObj.genre !== undefined && searchObj.genre !== null){
        scrollToGenre()
    }
  },[searchObj.genre])

  const scrollToGenre = () => {
    const genreElement = document.getElementById(searchObj.genre.name.toLowerCase());
    genreElement.scrollIntoView({ behavior: 'smooth', block: 'center'  });
  };

  function MovieList(props) {
    const myGenre = myMoviesObject.find(element => element.genreName === props.genreName)
    const [activeIndex, setActiveIndex] = useState(0);
    const Handlers = useSwipeable({
      onSwipedLeft: () => handleScroll('right'),
      onSwipedRight: () => handleScroll( 'left'),
    });
    const handleScroll = (direction) => {
        if(direction === 'left'){
          if (activeIndex > 0) {
            setActiveIndex(activeIndex - 1);
          }
        }
        if(direction === 'right'){
          if (activeIndex < myGenre.movieList.length - 1) {
            setActiveIndex(activeIndex + 1);
        }
      }
    }

   if(myGenre !== undefined){
    let categoryTitle;
    const result = props.genreName.replace(/([A-Z])/g, " $1");
    categoryTitle = result.charAt(0).toUpperCase() + result.slice(1);
    if(myGenre.movieList.length > 0){
      return (
        <>
            <div className='body'>
              <div className='category'>{categoryTitle}</div> 
                  <div  {...Handlers} >
                      <div className="my-container">
                      <button className='btn-left' onClick={() => handleScroll('left')} disabled={activeIndex === 0}></button>
                      {myGenre.movieList.map(function(movie, index) {
                         if (index >= activeIndex && index < activeIndex + 5) {
                        return(
                          <div className='my-movies'id={categoryTitle.toLowerCase()} style={{width: '100%'}} key={movie.id}>
                            <li key={movie.id}>
                              <MoviePopover props={movie} moviePoster={movie.poster_path} />
                            </li>
                          </div>
                        )} 
                      })}
                      <button className='btn-right'
                          onClick={() => handleScroll('right')}
                          disabled={activeIndex >= myGenre.movieList.length - 5}
                        >
                      </button>
                  </div>
              </div>
            </div>
        </>
      )
    }
  }}
  if(myMoviesObject !== undefined){
    return (
      <>
          <MovieList genreName={'post-apocalyptic'}/>
          <MovieList genreName={'alien'}/>
          <MovieList genreName={'werewolf'}/>
          <MovieList genreName={'zombie'}/>
          <MovieList genreName={'slasher'}/>
          <MovieList genreName={'creature'}/>
          <MovieList genreName={'vampire'}/>
          <MovieList genreName={'cannibal'}/>
          <MovieList genreName={'sci-fi'}/>
          <MovieList genreName={'horrorComedy'}/>
      </>
    );
  }
}


export default DisplayMovies;