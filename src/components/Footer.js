import React from 'react';

const Footer = () => {
    return (
        <footer style={footerStyle}>
            <p>Movie Finder App is powered by TMDB and JustWatch.</p>
        </footer>
    );
};

const footerStyle = {
    color: 'white',
    height: '100%',
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '5vh',
    flex: 1,
    backgroundColor: 'black',
    padding: '10px',
    textAlign: 'center',
    fontSize: '20px',
};

export default Footer;