import React from "react";
import { useEffect, useState } from "react";
import DisplayMovies from "./DisplayMovies";

export default function TestingServer({getMovieObjects,searchObj, userInputValue, getUserMovieList}) {
  const [decade, setDecade] = useState(undefined);
  const [apiCallList, setApiCallList] = useState(null);
  const [categoryMoviesList, setCategoryMoviesList] = useState([]);
  const [userInput, setUserInput] = useState();
  const [userInputMoviesList, setUserinputMovies] = useState();

  useEffect(() => {
    if(searchObj.decade !== undefined){
      setDecade(searchObj.decade);
    }
  },[searchObj])

  useEffect(() => {
    console.log('movieApiCallList')
    if(decade !== undefined){
      let movieApiCallList = [];
      movieApiCallList.push({genreName:"alien", genreNumber: 27, decade: decade, keywords: 9951})
      movieApiCallList.push({genreName:"post-apocalyptic", genreNumber: 27, decade: decade, keywords: "285366|4458"})
      movieApiCallList.push({genreName:"werewolf", genreNumber: 27, decade: decade, keywords:12564})
      movieApiCallList.push({genreName:"horrorComedy", genreNumber: "27,35", decade: decade})
      movieApiCallList.push({genreName:"sci-fi", genreNumber: "27,878", decade: decade})
      movieApiCallList.push({genreName:"slasher", genreNumber: 27, decade: decade, keywords: 12339})
      movieApiCallList.push({genreName:"zombie", genreNumber: 27, decade: decade, keywords: 12377})
      movieApiCallList.push({genreName:"creature", genreNumber: 27, decade: decade, keywords: 13031})
      movieApiCallList.push({genreName:"cannibal", genreNumber: 27, decade: decade, keywords: 14895})
      movieApiCallList.push({genreName:"vampire", genreNumber: 27, decade: decade, keywords: 3133})
      setApiCallList(movieApiCallList);
      setCategoryMoviesList([]);
    }
  },[decade]);

  // this fetches movies and adds them to categoryMoviesList
  useEffect(() => {
    console.log('fetchData')
    const fetchData = async () => {
      console.log("Fetching main categories");
      try {
        for (let i = 0; i <= apiCallList.length; i++) {
          const response = await fetch(
            "https://horror-movie-app-server-f55a090ce3b2.herokuapp.com/discover",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(apiCallList[i]),
            }
          );
          const data = await response.json();
          setCategoryMoviesList((prevList) => [...prevList, data]);
        }
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    if(apiCallList !== null){
      fetchData();
    }
  
  }, [apiCallList]);

  // this creates (genreList) checks to see if it contains (5) or more movies then is sent to (Navbar)
  useEffect(() => {
    if (categoryMoviesList !== undefined && categoryMoviesList !== null) {
      let genreList = [];
      console.log(categoryMoviesList)
      for (let index = 0; index < categoryMoviesList.length; index++) {
        if (
          categoryMoviesList[index].movieList.length > 5 &&
          categoryMoviesList[index].genreName !== undefined
        ) {
          genreList.push(categoryMoviesList[index]);
        }
      }
      getMovieObjects(genreList);
    }
  }, [categoryMoviesList]);

  // the following code has to do with fetching user querys
  useEffect(() => {
    const fetchData = async () => {
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
        const data = await response.json();
        setUserinputMovies(data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    if (userInput !== undefined && userInput !== null) {
      if (userInput !== "") {
        fetchData();
      }
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
}
