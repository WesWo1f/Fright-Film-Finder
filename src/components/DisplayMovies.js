import '../styles/displayMovies.css'
import React, { useState, useEffect} from 'react';
import { useSwipeable } from "react-swipeable";
import MoviePopover from './MoviePopovers'

function DisplayMovies({movieObjects, searchObj}) {
  const [myMoviesObject, setMyMoviesObject] = useState();
  const [numberOfMoviesDisplayed, setNumberOfMoviesDisplayed] = useState();
  const [screenWidth, setScreenWidth] = useState(0);
  const [seletedGenre, setSelectedGenre] = useState()

  useEffect(() => {
    if(movieObjects.length > 0){
      setMyMoviesObject(movieObjects)
    }
  },[movieObjects]);


  useEffect(()=>{
      if(searchObj.genre !== undefined && searchObj.genre !== null){
        setSelectedGenre(searchObj.genre)
      }
  },[searchObj.genre])
  
  useEffect(()=>{
    if(seletedGenre !== undefined){
      scrollToGenre(seletedGenre)
    }
  },[seletedGenre])

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setScreenWidth(width);
    };
    window.addEventListener('resize', handleResize);

    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    // Perform actions based on screen size
    if (screenWidth > 768) {
      setNumberOfMoviesDisplayed(5)
    } else {
      setNumberOfMoviesDisplayed(2)
    }
  }, [screenWidth]);

  const scrollToGenre = (name) => {
    name = name.name.toLowerCase().replace(/\s/g, '');
    const genreElement = document.querySelector(`#${name}`);
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
    categoryTitle = categoryTitle.replace(/\-[a-z]/g, match => match.toUpperCase())
    if(myGenre.movieList.length > 5){
      return (
        <>
            <div className='body'>
              <div className='category'>{categoryTitle}</div> 
                  <div  {...Handlers} >
                      <div className="my-container">
                      <button className='btn-left' onClick={() => handleScroll('left')} disabled={activeIndex === 0}></button>
                      {myGenre.movieList.map(function(movie, index) {
                         if (index >= activeIndex && index < activeIndex + numberOfMoviesDisplayed) {
                        return(
                          <div className='my-movies'id={props.genreName.toLowerCase()} style={{ width: '100%'}}   key={movie.id}>
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
          <MovieList genreName={'post-apocalyptic'} />
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