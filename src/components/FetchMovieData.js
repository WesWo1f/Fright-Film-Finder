import React from 'react'
import { useState, useEffect, useRef } from 'react';
import axios from "axios";
import DisplayMovies from './DisplayMovies';


export default function FetchMovieData(props) {

    const  [movieObjects, setMovieObjects] = useState([])
    const  [apiCallData, setApicallData] = useState()
    const  [userInputMovies, setUserinputMovies] = useState()

    async function fetchMovies(subgenreUrl) {
      let url = subgenreUrl
      try {
        console.log('fetching movieData')
         const response = await axios.get(url);
         const results = await response.data.results;
       return results
       } catch (error) {
     }
    }

    const AaddMovie = (subGenre, movieList) => {
      if(subGenre === "userInput" && movieList !== undefined){
        movieList = movieList.filter(movie => movie.original_language === 'en')
        movieList = movieList.filter(movie => movie.poster_path !== null)
        setUserinputMovies(movieList)
      }
      movieList = movieList.filter(movie => movie.poster_path !== null)
      const newMovie = {  'genreName': subGenre, 'movieList': movieList}
      return newMovie
    }

    async function AcallingFetchMovies(){
      let finalMoiveData = []
      for (let index = 0; index < apiCallData.length; index++) {
       if(apiCallData[index] !== undefined){
          const movieList = await fetchMovies(apiCallData[index].apiCall)
          if(movieList.length > 0){
            finalMoiveData.push(AaddMovie(apiCallData[index].genreName, movieList))
          }
        }
      }
      setMovieObjects(finalMoiveData)
    }

    useEffect(() => {
      if(apiCallData !== props.finishedApiUrl && props.finishedApiUrl !== undefined){
        setApicallData(props.finishedApiUrl)
      }
      if(apiCallData !== undefined){
        AcallingFetchMovies()
      }
    },[props.finishedApiUrl, apiCallData]);

    useEffect(()=>{
      if(userInputMovies !== undefined && userInputMovies !== null){
        props.getUserMovies(userInputMovies)
      }
      if(movieObjects !== undefined && movieObjects !== null){
        let genreList = []
        for (let index = 0; index < movieObjects.length; index++) {
            if(movieObjects[index].movieList.length > 5){
              genreList.push(movieObjects[index])
            }
        }
        props.getMovieObjects(genreList)
      }
    },[movieObjects,userInputMovies])

   
    return (
      <>
      <DisplayMovies movieObjects={movieObjects} searchObj={props.searchObj} />
      </>
    )
}


