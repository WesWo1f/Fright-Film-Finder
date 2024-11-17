import React from 'react'
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import '../styles/watchProviders.css'
import fetchMovieData from '../utils/fetchMovieData';

export default function WatchProviders(movieId) {
  const [movieProviders, setMovieProviders] = useState()

  useEffect(() => {
    async function callFetchMovieData() {
      if(!movieProviders || movieProviders === undefined){
        const data = await fetchMovieData(movieId, 'watchproviders');
        setMovieProviders(data);
      }
    }
    callFetchMovieData()
  },[movieProviders, movieId])


  if(movieProviders !== undefined){
    function Providers(props){
      const platformType = props.type.toLowerCase()
      let buttonName = props.type
      if(buttonName === 'Flatrate'){
        buttonName = 'Stream'
      }
     try {
      if(movieProviders?.watchProviders?.US?.[platformType]?.length > 0){
       const providersArray = movieProviders?.watchProviders?.US?.[platformType].map(item => {
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
    if(!movieProviders?.watchProviders?.US){
      return (
        <>
          <h6>&#8595; Where to watch &#8595;</h6>
          <h6>Sorry no streaming options.  </h6>
        </>
      )
    }
    return (
      <>
        <h6 style={{fontWeight: 'bold'}}>&#8595; Where to watch &#8595;</h6>
        <div className='providers-container'>
          <Providers type={"Buy"}  />
          <Providers type={"Rent"} /> 
          <Providers type={"Flatrate"}/>
        </div>
      </>
    )
  }
}
