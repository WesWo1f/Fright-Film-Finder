import React, { useEffect } from "react";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import SearchPopup from "./SearchPopup";
import '../styles/navBar.css'
import ApiCallCreator from "./ApiCallCreator";

// A custom hook to get the current decade and generate an array of decades
const useDecades = () => {
  const currentDecade = Math.floor(new Date().getFullYear() / 10) * 10;
  const decades = ['All'];
  for (let i = currentDecade; i >= 1950; i -= 10) {
    decades.push(i);
  }
  return decades;
};

function NavBar() {
  const [searchText, setSearchText] = useState('');
  const [showSearchPopup, setShowSearchPopup] = useState(false);
  const [sharedValue, setSharedValue] = useState('');
  const [decade, setDecade] = useState();
  const [searchObj, setSearchObj] = useState({})
  const [userMovies, setUserMovies] = useState()
  const [genresList, setGenresList] = useState()
  const [selectedGenre, setSelectedGenre] = useState()
  const [showGenres, setShowGenres] = useState()

   // An array of decades to display in the dropdown
   const decades = useDecades();

  useEffect(() => {
    if(decade === null || decade === undefined){
      setDecade('All')
    }
    setSearchObj({
      genre: selectedGenre,
      decade: decade,
      query: searchText,
  });
  }, [decade, searchText, selectedGenre])

   const defaultGenres = [
      "Post-Apocalyptic",
     "Alien",
     "Werewolf",
     "Zombie",
     "Slasher",
     "Creature",
     "Vampire",
     "Cannibal",
     "Sci-Fi",
     "Horror Comedy",
   ]

  const handleGenreSelect = (value) => () => {
    setSelectedGenre(value)
  };

  const handleDecadeSelect = (value) => () => {
    setDecade(value)
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
  };

  const handleInputChange = (newValue) => {
    setSharedValue(newValue);
    setSearchText(newValue)
    setShowSearchPopup(true);
    if(sharedValue !== undefined && showSearchPopup !== null){
      setShowSearchPopup(true);
    }
  };

  const handleSearchPopupClose = () => {
    setShowSearchPopup(false);
    setSearchText('');
  };

  const handleUserMovies = (e) =>{
    setUserMovies(e)
  }
  const handleMovieObjects = (e) => {
    const incomingGenreList = e.map(g => g.genreName)
    console.log(incomingGenreList)

    if(incomingGenreList.length !== genresList){
      setGenresList(incomingGenreList)
      setShowGenres(true)
    }
    if(genresList === undefined || genresList.length === 0){
      setGenresList(defaultGenres)
      setShowGenres(true)
    }
  }

  return (
    <>
        <Navbar  expand="lg">
        <Container>
          <Navbar.Brand href="#home"><div className="brand-container"><span className='glowing-text'>Movie<br></br></span>
          <span className='glowing-text'>&nbsp;&nbsp;Fin</span>
          <span className='flickering-text'>d</span><span className='glowing-text' id="glowing-text-end">er</span></div></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
          <form className='search-box' onSubmit={handleSearchSubmit}>
                  <input
                type="text"
                value={sharedValue}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder="Search For Movie"
              />
          </form>
            <NavDropdown title={"Genre"} id="genre-dropdown">
                {showGenres && genresList.map((g) => (
                  <NavDropdown.Item
                    key={g}
                    eventKey={g}
                    onClick={handleGenreSelect(g)}
                  >
                    {g}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
              <NavDropdown title={"Decade"} id="decade-dropdown">
                  {decades.map((d) => (
                    <NavDropdown.Item
                      key={d}
                      eventKey={d}
                      onClick={handleDecadeSelect(d)}
                    >
                      {d}
                    </NavDropdown.Item>
                  ))}
                </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

        {sharedValue && showSearchPopup && <SearchPopup value={sharedValue} onChange={handleInputChange} onClose={handleSearchPopupClose} movieList={userMovies} />}

        <ApiCallCreator searchObj={searchObj} getUserMovies={handleUserMovies} getMovieObjects={handleMovieObjects} /> 
        </>
  );
}

export default NavBar;





