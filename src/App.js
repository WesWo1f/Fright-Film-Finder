import React, { useState, useCallback } from 'react';
import NavBar from './components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchPopup from './components/SearchPopup';
import Footer from './components/Footer';


function App() {
  const [userMovieList, setUserMovieList] = useState([]);
  const [combinedSearchValue, setCombinedSearchValue] = useState('');


  const getUserMovieList = useCallback((userMovieList) => {
    setUserMovieList(userMovieList);
  }, []);

  const getSearchInput = (value) => {
    setCombinedSearchValue(value);
  };


  return (
    <>
      <NavBar combinedSearchValue={combinedSearchValue} getSearchInput={getSearchInput}  getUserMovieList={getUserMovieList} />
      <SearchPopup combinedSearchValue={combinedSearchValue} getSearchInput={getSearchInput}  userMovieList={userMovieList} /> 
      <Footer/>
    </>
  );
}

export default App;