import React from 'react';
import NavBar from './components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import ApiCallCreator from './components/ApiCallCreator';
import FetchMovieData from './components/FetchMovieData';

function App() {
  const [searchObj, setSearchObj] = useState({})
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedDecade, setSelectedDecade] = useState(null);
  const [searchInput, setSearchInput] = useState(null);
  const [searchPopupMoives, setSearchPopupMoives] = useState(null) 
  const [apiCall, setApiCall] = useState();

  const handleFilterChange = (filter) => {
    if(filter.genre !== null && filter.genre !== undefined){
      setSelectedGenre(filter.genre);
    }
    if(filter.decade !== null && filter.decade !== undefined){
      setSelectedDecade(filter.decade);
    }
  };

  useEffect(() => {
    if(selectedDecade === null){
      setSelectedDecade('All')
    }
    setSearchObj({
      genre: selectedGenre,
      decade: selectedDecade,
      query: searchInput,
  });
  }, [selectedGenre, selectedDecade, searchInput])

  const apiCallProp = (value) => {
    setApiCall(value);
  };

  const handleSearchChange = (value) =>{
    setSearchInput(value)
  }

  const handleMovieData = (value) => {
    setSearchPopupMoives(value)
  }

  return (
    <>
      <NavBar
        searchPopupMoives={searchPopupMoives}
        onSearchChange={handleSearchChange}
        onFilterChange={handleFilterChange}
      />
        <FetchMovieData fetchedMovieData={handleMovieData} searchInput={searchInput} searchObj={searchObj} finishedApiUrl={apiCall}/>
        <ApiCallCreator searchObj={searchObj} apiCallProp={apiCallProp}/>
    </>
  );
}

export default App;
