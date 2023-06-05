import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import '../styles/searchPopup.css'


export default function SearchPopup({ text, onChange, onClose }) {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className='search-popup-container'>
      <input
        className='searchBoxQuery' 
        ref={inputRef}
        value={text}
        onChange={onChange}
      />
      <button className='search-close-button' onClick={onClose}>Close</button>
    </div>
  );
}
