import React from 'react'
import axios from "axios";
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import '../styles/watchProviders.css'

export default function WatchProviders(props) {
    const [movieId, setMovieId] = useState()
    const [movieProviders, setMovieProviders] = useState()

    useEffect(()=>{
      if(props.movieId !== undefined){
        setMovieId(props.movieId.toString())
      }
    },[props.movieId])  

    useEffect(()=>{
      if(movieId !== undefined){
        async function getDataData(){
          const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NTgyNWQyNGM2NGE3MzliYjY3MDczMzViMTY0NWIwYyIsInN1YiI6IjYyMjk1NTg1NmU5MzhhMDAxYjdmMzk1NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZtWnnkzKSdFDGzIYVuDStj_FjXkosLXM0E0ynDxM8vk'
            }
          };
            async function getData(){
              const response = await  fetch(`https://api.themoviedb.org/3/movie/${movieId}/watch/providers`, options)
              const data = await response.json();
              return data
            }
            setMovieProviders(await getData())
        }
        getDataData()
      }
    },[movieId])

  if(movieProviders !== undefined){
    function Providers(props){
      const platformType = props.type.toLowerCase()
      let buttonName = props.type
      if(buttonName === 'Flatrate'){
        buttonName = 'Stream'
      }
     try {
      if(movieProviders?.results?.US?.[platformType]?.length > 0){
       const providersArray = movieProviders?.results?.US?.[platformType].map(item => {
          return item 
        })
        const providersPopover = (
          <Popover id="popover-basic" >
            <Popover.Body >
                  <ul>
                    {providersArray.map((item, index) => (
                      <li key={index} className='watch-providers-logo-and-name-container'>
                        {<img className='watch-providers-logo'
                          src={`https://image.tmdb.org/t/p/w500${item.logo_path}`}
                          alt={item.provider_name}/>}
                        <div className='watch-providers-name'>
                          {item.provider_name}
                        </div>
                      </li>
                    ))}
                  </ul>
            </Popover.Body>
          </Popover>
        );
    return (
      <>
        <OverlayTrigger trigger="click" rootClose={true} placement={"auto"} overlay={providersPopover} >
        <Button style={{margin: 5}}>{buttonName}</Button>
        </OverlayTrigger>
     </>
    )}
     } catch (error) {
      
     }
    }
    return (
      <>
      <h6>&#8595; Where to watch &#8595;</h6>
        <div className='providers-container'>
          <Providers type={"Buy"}  />
          <Providers type={"Rent"} />
          <Providers type={"Flatrate"} />
        </div>
      </>
    )
    }
}
