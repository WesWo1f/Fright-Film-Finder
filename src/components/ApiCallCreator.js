import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useRef } from 'react'

export default function ApiCallCreator({searchObj, apiCallProp}) {
    const [currentDecade, setcurrentDecade] = useState('All')
    const [apiCall, setApiCall] = useState([])
    const apiKey ="55825d24c64a739bb6707335b1645b0c"
    let baseUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false`

    useEffect(() => {
        if(typeof(searchObj.decade) !== 'undefined' && searchObj.decade !== null){
            console.log(searchObj)
            setcurrentDecade(searchObj.decade)
        }
    })

    function urlMaker(url, genre){
        if(currentDecade !== 'All'){
            url = addDecade(url)
        }
        url = addSubgenre(url, genre)
        return url
    }
    function addDecade(url){
        return url = url + `&primary_release_date.gte=${searchObj.decade}-01-01&primary_release_date.lte=${Number(searchObj.decade) + 9}-12-31`
    }
    function addSubgenre(url, genre){
        return  url = url + genre
    } 

    function apiCallObjectMaker(genreName, apiCall){
        const obj = {
            'genreName': genreName,
            'apiCall': apiCall 
        }
        return obj
    }

    useEffect(() => {
        setApiCall([
            apiCallObjectMaker("userInput", `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchObj.query}&include_adult=false&language=en-US&page=1`),
            apiCallObjectMaker("slasher", urlMaker(baseUrl, '&with_genres=27&with_keywords=12339')),
            apiCallObjectMaker("creature", urlMaker(baseUrl,'&with_genres=27&with_keywords=13031')),
            apiCallObjectMaker("vampire", urlMaker(baseUrl, '&with_genres=27&with_keywords=3133')),
            apiCallObjectMaker("horrorComedy", urlMaker(baseUrl, '&with_genres=27,35')),
        ]);
    },[currentDecade, searchObj.query ])

    useEffect(() => {
        if(apiCall.length > 1){
            apiCallProp(apiCall)
        }
    })

  return ( null )
}


