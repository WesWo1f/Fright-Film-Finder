import React from "react";
import { useEffect, useState } from "react";
import DisplayMovies from "./DisplayMovies";
import getMovieApiCallList from '../utils/getMovieApiCallList';
import fetchMovieData from "../utils/fetchMovieData";

export default function FetchMovies({getMovieObjects, searchObj, getUserMovieList}) {
  const [categoryMoviesList, setCategoryMoviesList] = useState(null);

  useEffect(() => {
    if(!searchObj.decade){
      return;
    }
    const streamingProviderIds = searchObj.streamingServicesIds?.map((service) => service.providerId);
    const movieApiCallList = getMovieApiCallList(searchObj.decade);
    const fetchData = async () => {
        console.log("fetching default movie data");
        if (movieApiCallList?.length > 0) {
          try {
            const promises = movieApiCallList.map(element => 
                fetchMovieData(element, "discover", streamingProviderIds)
            );
            const data = await Promise.all(promises);
            const filteredMovies = checkCategoryMoviesListLength(data);
            setCategoryMoviesList(filteredMovies);
            getMovieObjects(filteredMovies);
          } catch (error) {
            console.log("Error fetching data:", error);
          }
        }
      };
      fetchData();

  }, [searchObj.decade, searchObj.streamingServicesIds, getMovieObjects]);


  useEffect(() => {
    if(searchObj?.userSearchBoxInput?.length > 0){
    const fetchData = async () => {
        try {
            const data = await fetchMovieData(searchObj.userSearchBoxInput, "userquery", 0);
            getUserMovieList(data);
        } catch (error) {
            console.log("Error fetching data:", error);
        }
    };
    fetchData();
  }
  }, [searchObj.userSearchBoxInput, getUserMovieList]);



  return (
    <>
      <DisplayMovies movieObjects={categoryMoviesList} searchObj={searchObj}/>
    </>
  );


  function checkCategoryMoviesListLength(categoryMoviesList){
    if (categoryMoviesList?.length > 0) {
      let genreList = [];
      for (let index = 0; index < categoryMoviesList?.length; index++) {
        if (
          categoryMoviesList[index]?.movieList?.length > 5 &&
          categoryMoviesList[index]?.genreName !== undefined
        ) {
          genreList.push(categoryMoviesList[index]);
        }
      }
      return genreList;
    }
  }
}