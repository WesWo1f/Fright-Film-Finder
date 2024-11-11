import React, { useEffect, useCallback } from "react";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import '../styles/navBar.css'
import FetchMovies from "./FetchMovies";
import SearchBar from "./SearchBar";
import StreamingServices from "./StreamingServices";
import { GenreDropDown } from "./GenreDropDown";
import { DecadesDropDown } from "./DecadesDropDown";


function NavBar(props) {
  const { getUserMovieList, getSearchInput, combinedSearchValue} = props;
  const [decade, setDecade] = useState("All");
  const [searchObj, setSearchObj] = useState({})
  const [genresList, setGenresList] = useState([])
  const [selectedGenre, setSelectedGenre] = useState()
  const [selectedServices, setSelectedServices] = useState([]);

  const handleSelectedServicesChange = (services) => {
    setSelectedServices(services);
  };

  useEffect(() => {
    setSearchObj({
      genre: selectedGenre,
      decade: decade,
      userSearchBoxInput: combinedSearchValue,
      streamingServicesIds: selectedServices
  });
  }, [decade, combinedSearchValue, selectedGenre, selectedServices]);

  const handleGenreSelect = (value) => () => {
    setSelectedGenre(value)
  };

  const handleDecadeSelect = (value) => () => {
    setDecade(value)
  };

  const handleMovieObjects = useCallback((e) => {
    if (e?.length > 0) {
      const incomingGenreList = e.map((g, index) => ({
        id: index,
        name: capitalizeGenreNames(g.genreName),
      }));
      setGenresList(incomingGenreList);
    }
  }, [setGenresList]);

  function capitalizeGenreNames(str){
    let words = str.replace(/([a-z])([A-Z])/g, '$1 $2')
    return words.replace(/(^|-|\s+)([a-z])/g, (match, separator, letter) => {
      return separator + letter.toUpperCase();
    });
  }

  const handleUserMovies = useCallback((e) => {
    getUserMovieList(e.movieList);
  }, [getUserMovieList]);

  const handleSearchInput = (e) => {
    getSearchInput(e);
  }

  return (
    <>
        <Navbar expand="lg">
        <Container>
          <Navbar.Brand href="#home">Fright Film Finder</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
            <SearchBar sharedValue={combinedSearchValue}  getSearchInput={handleSearchInput}/>
              <NavDropdown title={"Streaming Services"} id="streaming-services-dropdown">
                <StreamingServices onSelectedServicesChange={handleSelectedServicesChange}/>
              </NavDropdown>
              <NavDropdown title={"Genre"} id="genre-dropdown">
                <GenreDropDown genresList={genresList} handleGenreSelect={handleGenreSelect} />
              </NavDropdown>
              <NavDropdown title={"Decade"} id="decade-dropdown">
                <DecadesDropDown handleDecadeSelect={handleDecadeSelect} />
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      { searchObj.decade ? <FetchMovies searchObj={searchObj} getMovieObjects={handleMovieObjects} getUserMovieList={handleUserMovies}/> : null }

    </>
  );
}

export default NavBar;


