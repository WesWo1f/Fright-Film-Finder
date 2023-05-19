import React, { useState, useEffect } from 'react';
import axios from "axios";
import '../styles/movieSearch.css'
import DisplayMovies from './DisplayMovies';

function MovieSearch({searchObj, finishedApiUrl}) {
  const [decade, setDecade] = useState([]);
  const [movies, setMovies] = useState([]);
  const [apiUrl, setApiUrl] = useState([]);
  const [slasher, setSlasher] = useState([]);
  const [creature, setCreature] = useState([]);
  const [vampire, setVampire] = useState([])
  const [horrorComedy, setHorrorComedy] = useState([])

  useEffect(()=>{
    setApiUrl(finishedApiUrl)
    setDecade(searchObj.decade)
  })

  useEffect(() => {
     if(typeof(slasher) !== 'undefined' && typeof(creature) !== 'undefined' && typeof(vampire) !== 'undefined' && typeof(horrorComedy) !== 'undefined'){
       setMovies({
         'genre': searchObj.genre,
         'slasher' : slasher,
         'creature' : creature,
         'vampire' : vampire,
         'horrorComedy' : horrorComedy
       })
     }
   },[slasher, creature, horrorComedy, vampire])

    useEffect(() => {
      console.log('requesting movie data')
       async function fetchMovies(subgenreUrl) {
         let url = subgenreUrl
         try {
            const response = await axios.get(url);
            const results = await response.data.results;
          return results

          } catch (error) {
          //  console.error(error);
        }
      }
      async function setMoviesData(){
          try {
              setSlasher({
                 'slasher' : await fetchMovies(apiUrl[0].slasherCall, 12339)
               });
                setCreature({
                 "creature" : await fetchMovies(apiUrl[1].creatureCall, 13031),
               });
                setVampire({
                 "vampire" : await fetchMovies(apiUrl[2].vampireCall, 3133),
               });
                setHorrorComedy({
                 "horrorComedy" :await fetchMovies(apiUrl[3].horrorComedyCall, 35),
               });
        } catch (error) {
            
        }
      }
      setMoviesData()
     },[decade, searchObj.decade, apiUrl]); 
     
  return (
    <>
    <DisplayMovies movies={movies}/>
    </>
  );
}

export default MovieSearch;


