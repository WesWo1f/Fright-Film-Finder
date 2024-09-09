import React from "react";
import { useEffect, useState } from "react";
import DisplayMovies from "./DisplayMovies";
import getMovieApiCallList from '../utils/GetMovieApiCallList';

export default function TestingServer({getMovieObjects, searchObj, userInputValue, getUserMovieList}) {
  const [decade, setDecade] = useState(undefined);
  const [apiCallList, setApiCallList] = useState(undefined);
  const [categoryMoviesList, setCategoryMoviesList] = useState(undefined);
  const [userInput, setUserInput] = useState();
  const [userInputMoviesList, setUserInputMovies] = useState();
  const [streamingService, setStreamingService] = useState(undefined);


  useEffect(() => {
    setStreamingService(searchObj.providerIds)
    if(searchObj.decade !== undefined){
      setDecade(searchObj.decade);
    }
  },[searchObj]);


  useEffect(() => {
    if(decade !== undefined){
    const movieApiCallList = getMovieApiCallList(decade);
    setApiCallList(movieApiCallList);
    setCategoryMoviesList([]);
    }
  }, [decade]);

  // this fetches movies and adds them to categoryMoviesList
  useEffect(() => {
        const streamingProviderIds = streamingService?.map((service) => service.providerId);
        const fetchData = async () => {
          if (apiCallList !== undefined && apiCallList?.length > 0 ){
            console.log("fetching default movie data");
              try {
                  const data = await fetchMovieByStreamingServiceData(apiCallList, streamingProviderIds);
                  setCategoryMoviesList(data);
              } catch (error) {
                  console.log("Error fetching data:", error);
              }
          }
        };
      fetchData();
  }, [apiCallList, streamingService]);

  // this creates (genreList) checks to see if it contains (5) or more movies then is sent to (Navbar)
  useEffect(() => {
    getMovieObjects(checkCategoryMoviesListLength(categoryMoviesList));
  }, [categoryMoviesList]);

  // the following code has to do with fetching user querys
  useEffect(() => {
    if(userInput !== undefined && userInput !== null && userInput !== ""){
    const fetchData = async () => {
      if (userInput !== undefined && userInput !== null) {
          try {
              const data = await fetchUserInputData(userInput);
              setUserInputMovies(data);
          } catch (error) {
              console.log("Error fetching data:", error);
          }
      }
    };
    fetchData();
  }
  }, [userInput]);

  //this sets the value the user has typed
  useEffect(() => {
    setUserInput(userInputValue);
  }, [userInputValue]);

  //this code brings user requested movies to NavBar
  useEffect(() => {
    if (userInputMoviesList !== null && userInputMoviesList !== undefined) {
      getUserMovieList(userInputMoviesList);
    }
  }, [userInputMoviesList]);



  return (
    <>
      <DisplayMovies
        movieObjects={categoryMoviesList}
        searchObj={searchObj}
      />
    </>
  );


  function checkCategoryMoviesListLength(categoryMoviesList){
    if (categoryMoviesList !== undefined && categoryMoviesList !== null) {
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
  async function fetchUserInputData(userInput) {
    console.log("Fetching user movie request");
    try {
      const response = await fetch(
        "https://horror-movie-app-server-f55a090ce3b2.herokuapp.com/userquery",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query: userInput }),
        }
      );
      return await response.json();
    } catch (error) {
      console.log("Error fetching data:", error);
      return null;
    }
  };

  //TODO  see if you can get this to work and also clean up the code?
  async function fetchMovieByStreamingServiceData(apiCallList, streamingService){
    let categoryMoviesList = [];
    try {
        for (let i = 0; i < apiCallList.length; i++) {
            const response = await fetch(
              "https://horror-movie-app-server-f55a090ce3b2.herokuapp.com/discover",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({query: apiCallList[i], provider: streamingService}),
                }
            );
            const data = await response.json();
            categoryMoviesList = [...categoryMoviesList, data];
        }
    } catch (error) {
        console.log("Error fetching data:", error);
        return null;
    }
    return categoryMoviesList;
  };
}
