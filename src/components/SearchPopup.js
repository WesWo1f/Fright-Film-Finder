import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import '../styles/searchPopup.css'
import MoviePopover from './MoviePopovers'

export default function SearchPopup({value, onChange, movieList, onClose}) {

  const [filteredList, setFilteredList] = useState()
  const [displayPopup, setDisplayPopup] = useState(false)

  const handleChange = (event) => {
    onChange(event.target.value);
  };

  
  useEffect(() => {
    if(movieList !== undefined && movieList !== null){
      movieList = movieList.filter(movie => movie.original_language === 'en' && movie.poster_path !== null)
      setFilteredList(movieList)
      setDisplayPopup(true)
    }
    else{
      setDisplayPopup(false)
    }
  },[movieList])

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
              {displayPopup &&
                filteredList.map(function(movie) {
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