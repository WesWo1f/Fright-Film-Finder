import { useEffect, useState } from 'react'

export default function useHandleScreenResize() {
    const [numberOfMoviesDisplayed, setNumberOfMoviesDisplayed] = useState();
    const [screenWidth, setScreenWidth] = useState(0);

    useEffect(() => {
        const handleResize = () => {
          const width = window.innerWidth;
          setScreenWidth(width);
        };
        window.addEventListener('resize', handleResize);
    
        handleResize();
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);
    
      useEffect(() => {
        // Perform actions based on screen size
        if (screenWidth > 768) {
           setNumberOfMoviesDisplayed(6)
        } else {
          setNumberOfMoviesDisplayed(3)
        }
      }, [screenWidth]);
  return (
    numberOfMoviesDisplayed
  )
}
