import React, { useEffect } from "react";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import SearchPopup from "./SearchPopup";
import '../styles/navBar.css'

// A custom hook to get the current decade and generate an array of decades
const useDecades = () => {
  const currentDecade = Math.floor(new Date().getFullYear() / 10) * 10;
  const decades = ['All'];
  for (let i = currentDecade; i >= 1950; i -= 10) {
    decades.push(i);
  }
  return decades;
};

function NavBar(props) {
  const [searchText, setSearchText] = useState('');
  const [showSearchPopup, setShowSearchPopup] = useState(false);
  // An array of genres to display in the dropdown

    const genres = [
      { name: "Slasher", id: "00" },
      { name: "Creature", id: "00" },
      { name: "Vampire", id: "00" },
      { name: "Horror Comedy", id: "00" },
    ]
    
    // An array of decades to display in the dropdown
    const decades = useDecades();

    // A function to handle the genre change
    const handleGenreChange = (eventKey) => {
      props.onFilterChange({ genre: eventKey, decade: props.selectedDecade });
    };
      // A function to handle the decade change
    const handleDecadeChange = (eventKey) => {
      props.onFilterChange({ genre: props.selectedGenre, decade: eventKey });
    };

    // A custom function that returns a function
    const handleGenreSelect = (value) => () => {
      handleGenreChange(value);
    };
     // A custom function that returns a function
    const handleDecadeSelect = (value) => () => {
      handleDecadeChange(value);
    };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearchClick = () => {
    setShowSearchPopup(true);
  };

  const handleSearchPopupClose = () => {
    setShowSearchPopup(false);
    setSearchText('');
  };


  return (
    <>
        <Navbar  expand="lg">
        <Container>
          <Navbar.Brand href="#home">Movie Finder</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
          <form className='search-box' onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Search..."
              value={searchText}
              onChange={handleSearchChange}
              onClick={handleSearchClick}
            />
          </form>
            <NavDropdown title={"Genre"} id="genre-dropdown">
                {genres.map((g) => (
                  <NavDropdown.Item
                    key={g.name}
                    eventKey={g.name}
                    onClick={handleGenreSelect(g)}
                  >
                    {g.name}
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
        {showSearchPopup && (
          <SearchPopup
            text={searchText}
            onChange={handleSearchChange}
            onClose={handleSearchPopupClose}
          />
        )}
        </>
  );
}

export default NavBar;





