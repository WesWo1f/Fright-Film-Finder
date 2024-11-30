import '../styles/displayMovies.css'
import React, { useState, useEffect} from 'react';
import { useSwipeable } from "react-swipeable";
import MoviePopover from './MoviePopovers'
import ArrowButton from './ArrowButton';
import useHandleScreenResize from '../utils/useHandleScreenResize';

function DisplayMovies({movieObjects, searchObj}) {
  const [myMoviesObject, setMyMoviesObject] = useState();
  const [numberOfMoviesDisplayed, setNumberOfMoviesDisplayed] = useState();
  const [selectedGenre, setSelectedGenre] = useState();
  const screenSize = useHandleScreenResize();
  
  useEffect(() => {
      setNumberOfMoviesDisplayed(screenSize)
  }, [ screenSize]);

  useEffect(() => {
    if(movieObjects?.length > 0 ){
      setMyMoviesObject(movieObjects)
    }
    setSelectedGenre(searchObj.genre)
  },[movieObjects, searchObj]);

  useEffect(()=>{
    if(selectedGenre !== undefined){
      scrollToGenre(selectedGenre.name)
    }
  },[selectedGenre])


  const scrollToGenre = (name) => {
    name = name?.toLowerCase()?.replaceAll(' ','');
    const genreElement = document.querySelector(`#${name}`);
    genreElement.scrollIntoView({ behavior: 'smooth', block: 'center'  });
  };

  function MovieList(props) {
    const myGenre = myMoviesObject[props.index]
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
          if(activeIndex >= myGenre?.movieList?.length - 6){
            return;
          }
          if (activeIndex < myGenre.movieList.length - 1) {
            setActiveIndex(activeIndex + 1);
        }
      }
    }

   if(myMoviesObject && myMoviesObject[props.index] && myMoviesObject[props.index].genreName !== undefined){
    const genreName = myMoviesObject[props.index].genreName; 
    const movieList = myMoviesObject[props.index].movieList;
    const result = genreName.replace(/([A-Z])/g, " $1");
    let categoryTitle = result.charAt(0).toUpperCase() + result.slice(1);
    categoryTitle = categoryTitle.replace(/-[a-z]/g, match => match.toUpperCase())
    if(movieList?.length > 5){
      return (
        <>
        <div className='body'>
          <div className='category'>{categoryTitle}</div> 
              <div  {...Handlers} >
                  <div className="my-container">
                    <ArrowButton direction="left" handleScroll={handleScroll} activeIndex={activeIndex} movieList={movieList} />
                  {movieList.map((movie, index) => {
                     if (index >= activeIndex && index < activeIndex + numberOfMoviesDisplayed) {
                    return(
                      <div className='my-movies' id={genreName.toLowerCase()} key={movie.id}>
                        <li  key={movie.id}>
                          <MoviePopover props={movie} moviePoster={movie.poster_path}  />
                        </li>
                      </div>
                    );
                  }
                  return null;
                  })}
                    <ArrowButton direction="right" handleScroll={handleScroll} activeIndex={activeIndex} movieList={movieList}/>
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
          {myMoviesObject.map((genre, index) => (
            <MovieList key={genre.genreName} index={index} genreName={genre.genreName} />
          ))}
      </>
    );
  }
}

export default DisplayMovies;