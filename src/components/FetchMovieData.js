import React from 'react'
import { useState, useEffect, useRef } from 'react';
import axios from "axios";
import DisplayMovies from './DisplayMovies';

export default function FetchMovieData(props) {

    const  [movieObjects, setMovieObjects] = useState([])
    const apiCall = useRef(props.finishedApiUrl);


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

    const addMovie = (subGenre, movieList) => {
      let genreExist = movieObjects.find(movies => movies.genreName === subGenre);
      if(genreExist){
        setMovieObjects(prevState => prevState.map(movie => movie.genreName === subGenre ? { ...movie, movieList: movieList } : movie))
      }
      else{
        setMovieObjects(prevMovieObjects => {
          const newMovie = {  'genreName': subGenre,'movieList': movieList}
          return [...prevMovieObjects, newMovie];
        });
      }
    }

    async function callingFetchMovies(){
      if(props.finishedApiUrl !== undefined){
          apiCall.current.forEach(async element => {
          const movie = await fetchMovies(element.apiCall)
          addMovie(element.genreName, movie)
        });
      } 
    }


    useEffect(() => {
      if(apiCall.current !== props.finishedApiUrl && props.finishedApiUrl !== undefined){
        apiCall.current = props.finishedApiUrl;
        callingFetchMovies()
      }
    });
 
 
  return (
    <>
    <DisplayMovies movieObjects={movieObjects} searchObj={props.searchObj} />
    </>
  )
}


