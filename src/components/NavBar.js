import React, { useEffect } from "react";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import SearchPopup from "./SearchPopup";
import '../styles/navBar.css'
import Button from "react-bootstrap/Button";
import FetchMovies from "./FetchMovies";
import NetflixIcon from '../logos/netflix-icon.jpg';
import HBOMaxIcon from '../logos/HBO-Max-icon.jpg';
import HuluIcon from '../logos/hulu-icon.jpg';
import AmazonPrimeVideoIcon from '../logos/Amazon-Prime-Video.jpg';


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
  const [showSearchPopup, setShowSearchPopup] = useState(false);
  const [sharedValue, setSharedValue] = useState('');
  const [decade, setDecade] = useState();
  const [searchObj, setSearchObj] = useState({})
  const [userMovies, setUserMovies] = useState()
  const [genresList, setGenresList] = useState([])
  const [selectedGenre, setSelectedGenre] = useState()
  const [streamingServiceAndProviderIds, setStreamingServiceAndProviderIds] = useState([]);
  const decades = useDecades();

  const streamingServices = [
    { name: 'Netflix', providerId: '8', icon: NetflixIcon },
    { name: 'HBO', providerId: '1899', icon: HBOMaxIcon },
    { name: 'Hulu', providerId: '15', icon: HuluIcon },
    { name: 'Amazon Prime', providerId: '9', icon: AmazonPrimeVideoIcon }
  ];

  useEffect(() => {
    if(decade === null || decade === undefined){
      setDecade('All')
    }
    setSearchObj({
      genre: selectedGenre,
      decade: decade,
      query: sharedValue,
      providerIds: streamingServiceAndProviderIds
  });
  }, [decade, sharedValue, selectedGenre, streamingServiceAndProviderIds]);

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
    setShowSearchPopup(true);
    if(sharedValue !== undefined && showSearchPopup !== null){
      setShowSearchPopup(true);
    }
  };

  const handleSearchPopupClose = () => {
    setShowSearchPopup(false);
    setSharedValue('')
  };

  const handleMovieObjects = (e) => {
    const capitalizeWords = (str) => {
      let words = str.replace(/([a-z])([A-Z])/g, '$1 $2')
      return words.replace(/(^|-|\s+)([a-z])/g, (match, separator, letter) => {
        return separator + letter.toUpperCase();
      });
    };
    
    if(e !== undefined && e !== null){
        const incomingGenreList = e.map((g, index) => ({ id: index,  name: capitalizeWords(g.genreName)}));
        setGenresList(incomingGenreList)
    }
  }

  const handleUserMovies = (e) => {
    setUserMovies(e.movieList)
  }

  

  const handleStreamingServiceSelect = (service) => () => {
    if(streamingServiceAndProviderIds.some(s => s.providerId === service.providerId)){
      setStreamingServiceAndProviderIds(streamingServiceAndProviderIds.filter(s => s.providerId !== service.providerId))
    } else {
      setStreamingServiceAndProviderIds([...streamingServiceAndProviderIds, service])
    }
  };

  return (
    <>
        <Navbar expand="lg">
        <Container>
          <Navbar.Brand href="#home">Fright Film Finder</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
          <form className='search-box' onSubmit={handleSearchSubmit}>
              <input
                type="text"
                value={sharedValue}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder="Search For Movies"
              />
          </form>
          <NavDropdown title={"Streaming Services"} id="streaming-services-dropdown">
                  {streamingServices.map((service) => (
                    <Button
                      key={service.name}
                      onClick={handleStreamingServiceSelect(service)}
                      variant={streamingServiceAndProviderIds.some(s => s.providerId === service.providerId) ? "primary" : "outline-primary"}
                      style={{ display: 'flex', alignItems: 'center', margin: '5px' }}
                    >
                      <img src={service.icon} alt={service.name} style={{ width: '20px', marginRight: '10px' }} />
                      {service.name}
                    </Button>
                  ))}
              </NavDropdown>
            <NavDropdown title={"Genre"} id="genre-dropdown">
            {genresList.length > 0 ? (
               genresList.map((g) => (
                  <NavDropdown.Item
                    key={g.id}
                    eventKey={g.name}
                    onClick={handleGenreSelect(g)}
                  >
                    {g.name}
                  </NavDropdown.Item>
                ))
                ) : (
                  <NavDropdown.Item disabled>No items available</NavDropdown.Item>
                )}
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
      
      <FetchMovies searchObj={searchObj} getMovieObjects={handleMovieObjects} userInputValue={sharedValue} getUserMovieList={handleUserMovies}/>

      {sharedValue && showSearchPopup && <SearchPopup value={sharedValue} onChange={handleInputChange} onClose={handleSearchPopupClose} movieList={userMovies} />}

    </>
  );
}

export default NavBar;


