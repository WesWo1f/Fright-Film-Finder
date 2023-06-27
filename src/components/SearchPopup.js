import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import '../styles/searchPopup.css'
import MoviePopover from './MoviePopovers'

export default function SearchPopup({value, onChange, movieList, onClose}) {

  const [userMovieList, setUserMovieList] = useState()

  const handleChange = (event) => {
    onChange(event.target.value);
  };
  
  useEffect(()=>{
    if(movieList !== undefined && movieList !== null){
      setUserMovieList(movieList)
    }
  })
    return (
        <>
          <div className='search-popup-container'>
            <div>
            <input
              className='searchBoxQuery' 
              type="text"
              value={value}
              onChange={handleChange}
              placeholder="Child Component"
            />
            <button className='search-close-button' onClick={onClose}>Close</button>
            </div>
            <ul className='search-popup-movies'> 
              {userMovieList &&
                movieList.map(function(movie) {
                  return (
                    <li key={movie.id}>
                      <MoviePopover props={movie} moviePoster={movie.poster_path} />
                    </li>
                  );
                })
                }
            </ul> 
          </div>
        </>
      )
}