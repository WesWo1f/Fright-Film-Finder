import React from 'react';
import NavBar from './components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieSearch from './components/MovieSearch';
import { useState, useEffect } from 'react';
import ApiCallCreator from './components/ApiCallCreator';
import MoviePopover from './components/MoviePopovers';

function App() {

  const [query, setQuery] = useState('');
  const [searchObj, setSearchObj] = useState({})
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedDecade, setSelectedDecade] = useState(null);
  const [startSearch, setStartSearch] = useState(false);
  const [apiCall, setApiCall] = useState();

  const handleSearchClick = (message) => {
    setQuery(message)
  }

  const handleFilterChange = (filter) => {
    console.log(filter.decade)
      setSelectedGenre(filter.genre);
      setSelectedDecade(filter.decade);
  };
  const searchNow = (test) => {
    console.log(test)
    setStartSearch(test)
  }

  useEffect(() => {
    if(selectedDecade === null){
      setSelectedDecade('All')
    }
    setSearchObj({
      startSearch: startSearch,
      genre: selectedGenre,
      decade: selectedDecade,
      query: query,
  });
  }, [selectedGenre, selectedDecade, query, startSearch])



  const apiCallProp = (value) => {
    setApiCall(value);
  };



  return (
    <>
    
    <NavBar
      searchNow={searchNow}
      selectedGenre={selectedGenre} 
      selectedDecade={selectedDecade} 
      onFilterChange={handleFilterChange}
      onSearchClick={handleSearchClick}
    />
      <ApiCallCreator searchObj={searchObj} apiCallProp={apiCallProp}/>
      <MovieSearch searchObj={searchObj} finishedApiUrl={apiCall} /> 
    </>
  );
}

export default App;
