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

    useEffect(() => {
        setApiCall([
            {
                'genreName': 'slasher',
                'apiCall': urlMaker(baseUrl, '&with_genres=27&with_keywords=12339' )
            },
            {   'genreName': 'creature',
                'apiCall': urlMaker(baseUrl,'&with_genres=27&with_keywords=13031')
            },
            {   'genreName': 'vampire',
                'apiCall': urlMaker(baseUrl, '&with_genres=27&with_keywords=3133')
            },
            {   'genreName': 'horrorComedy',
                'apiCall': urlMaker(baseUrl, '&with_genres=27,35')
            }
        ]);
    },[currentDecade])

    useEffect(() => {
        if(apiCall.length > 1){
            apiCallProp(apiCall)
        }
    })

  return ( null )
}


