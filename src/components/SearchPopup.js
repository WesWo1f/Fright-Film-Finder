import React,{ useEffect, useState } from 'react'
import '../styles/searchPopup.css'
import MoviePopover from './MoviePopovers'

export default function SearchPopup({combinedSearchValue, getSearchInput, userMovieList}) {
  const [filteredList, setFilteredList] = useState()
  
  const handleCloseButton = () => {
    getSearchInput('')
  }
  const handleChange = (e) => {
    getSearchInput(e.target.value);
  }
  
  useEffect(() => {
    if(userMovieList?.length > 0){
      let filteredUserMovieList = userMovieList.filter(movie => movie.original_language === 'en' && movie.poster_path !== null)
      setFilteredList(filteredUserMovieList)
    }
  },[userMovieList])

  if(combinedSearchValue?.length > 0){
    return (
      <>
        <div className='search-popup-container'>
          <div>
            <input
              className='searchBoxQuery' 
              type="text"
              value={combinedSearchValue}
              onChange={handleChange}
              placeholder="Search For Movies"
            />
            <button className='search-close-button' onClick={handleCloseButton}>Close</button>
          </div>
          <ul className='search-popup-movies'> 
            {filteredList?.map(function(movie) {
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
  else{
    <></>
  }
}