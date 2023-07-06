import React from 'react'
import { useEffect, useState } from 'react';
import DisplayMovies from './DisplayMovies';

export default function TestingServer(props) {
    const [decade, setDecade] = useState(null)
    const [apiCallList, setApiCallList] = useState(null)
    const [decadeDisplayed, setDacadeDisplayed] = useState(null)
    const [categoryMoviesList, setCategoryMoviesList] = useState([]);
    const [userInput, setUserInput] = useState();
    const [userInputMoviesList, setUserinputMovies] = useState();

    useEffect(() => {
      if(props.searchObj !== undefined){
        if(props.searchObj.decade !== undefined && props.searchObj.decade !== null){
          setDecade(props.searchObj.decade)
        }
      }
    },[props.searchObj])

    useEffect(()=>{
      setApiCallList(creatApiCallMovieList())
      setCategoryMoviesList([]);
    },[decade])

    // this fetches movies and adds them to categoryMoviesList
    useEffect(()=>{
      const fetchData = async () => {
        console.log('Fetching main categories')
        try {
          for (let i = 0; i <= apiCallList.length; i++) {
            const response = await fetch('https://horror-movie-app-server-f55a090ce3b2.herokuapp.com/discover', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(apiCallList[i])
            });
            const data = await response.json();
            setCategoryMoviesList((prevList) => [...prevList, data]);
          }
        } catch (error) {
          console.log('Error fetching data:', error);
        }
      };
      //this prevents unneeded fetching
      if(apiCallList !== null && decadeDisplayed !== decade){
        fetchData();
        setDacadeDisplayed(decade)
      }
    },[apiCallList])

    function creatApiCallMovieList(){
      let movieApiCallList = []
      movieApiCallList.push(createApiCallObjects("alien", 27, decade, 9951))
      movieApiCallList.push(createApiCallObjects("post-apocalyptic", 27, decade, '285366|4458'))
      movieApiCallList.push(createApiCallObjects("werewolf", 27, decade, 12564))
      movieApiCallList.push(createApiCallObjects("horrorComedy", '27,35', decade))
      movieApiCallList.push(createApiCallObjects("sci-fi", "27,878", decade))
      movieApiCallList.push(createApiCallObjects("slasher", 27, decade, 12339))
      movieApiCallList.push(createApiCallObjects("zombie", 27, decade, 12377))
      movieApiCallList.push(createApiCallObjects("creature", 27, decade, 13031))
      movieApiCallList.push(createApiCallObjects("cannibal", 27, decade, 14895))
      movieApiCallList.push(createApiCallObjects("vampire", 27, decade, 3133))
      return movieApiCallList
    }

    function createApiCallObjects(genreName, genreNumber, decade, keywords){
      return {"genreName": genreName, "genreNumber": genreNumber, "decade": decade, "keywords": keywords}
    }

    // this creates (genreList) checks to see if it contains (5) or more movies then is sent to (Navbar)
    useEffect(()=>{
      if(categoryMoviesList !== undefined && categoryMoviesList !== null){
        let genreList = []
        for (let index = 0; index < categoryMoviesList.length; index++) {
          if(categoryMoviesList[index].movieList.length > 5 && categoryMoviesList[index].genreName !== undefined){
            genreList.push(categoryMoviesList[index])
          }
        }
        props.getMovieObjects(genreList)
      }
    },[categoryMoviesList])

    // the following code has to do with fetching user querys 
    useEffect(()=>{
      const fetchData = async () => {
        console.log('Fetching user movie request')
        try {
            const response = await fetch('https://horror-movie-app-server-f55a090ce3b2.herokuapp.com/userquery', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({'query': userInput})
            });
            const data = await response.json();
            setUserinputMovies(data)
        } catch (error) {
          console.log('Error fetching data:', error);
        }
      };
      if(userInput !== undefined && userInput !== null){
        if(userInput !== ''){
          fetchData()
        }
      }
    },[userInput])

    //this sets the value the user has typed
    useEffect(() => {
      setUserInput(props.userInputValue)
    },[props.userInputValue])

    //this code brings user requested movies to NavBar
    useEffect(()=>{
      if(userInputMoviesList !== null && userInputMoviesList !== undefined){
        props.getUserMovieList(userInputMoviesList)
      }
    },[userInputMoviesList])

    return (
      <>
        <DisplayMovies movieObjects={categoryMoviesList} searchObj={props.searchObj} />
      </>
    );
    
}
