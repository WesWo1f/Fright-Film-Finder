import React from 'react';
import NavBar from './components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import ApiCallCreator from './components/ApiCallCreator';
import FetchMovieData from './components/FetchMovieData';
import SearchPopup from './components/SearchPopup'

function App() {
  const [searchObj, setSearchObj] = useState({})
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedDecade, setSelectedDecade] = useState(null);
  const [searchInput, setSearchInput] = useState(null);
  const [searchPopupMoives, setSearchPopupMoives] = useState(null) 
  const [apiCall, setApiCall] = useState();


  const handleFilterChange = (filter) => {
      setSelectedGenre(filter.genre);
      setSelectedDecade(filter.decade);
  };

  useEffect(() => {
    if(selectedDecade === null){
      setSelectedDecade('All')
    }
    setSearchObj({
      startSearch: '',
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
    console.log(value)

  }

  const handleMovieData = (value) => {
    setSearchPopupMoives(value)
    console.log(value)
  }
  useEffect(()=>{
    console.log(selectedDecade)
  })

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
