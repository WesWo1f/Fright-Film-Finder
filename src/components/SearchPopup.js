import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import '../styles/searchPopup.css'

export default function SearchPopup({ text, onChange, onClose, movieList }) {
  const inputRef = useRef(null);

  useEffect(() => {
    if(movieList !== null){
      inputRef.current.focus();
    }
  });

  if(movieList !== null && movieList !== undefined)
  return (
    <>
    <div className='search-popup-container'>
      <div>
      <input
        className='searchBoxQuery' 
        ref={inputRef}
        value={text}
        onChange={onChange}
      />
      <button className='search-close-button' onClick={onClose}>Close</button>
      </div>
      <div className='search-popup-movies'>
      {movieList.map(function(movie){
          return(
                <li className='search-popup-movies' key={movie.id}>
                  <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}/>
                </li>
        ) 
      })}
      </div>
      </div>
    </>
  );
}
