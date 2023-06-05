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
  const [apiCall, setApiCall] = useState();


  const handleFilterChange = (filter) => {
    console.log(filter.decade)
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
      query: '',
  });
  }, [selectedGenre, selectedDecade])

  const apiCallProp = (value) => {
    setApiCall(value);
  };

  return (
    <>
      <NavBar
        selectedGenre={selectedGenre} 
        selectedDecade={selectedDecade} 
        onFilterChange={handleFilterChange}
      />
        <FetchMovieData searchObj={searchObj} finishedApiUrl={apiCall}/>
        <ApiCallCreator searchObj={searchObj} apiCallProp={apiCallProp}/>
    </>
  );
}

export default App;
