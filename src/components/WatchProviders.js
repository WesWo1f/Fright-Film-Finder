import React from 'react'
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import '../styles/watchProviders.css'

export default function WatchProviders({movieData}) {
  const movieProviders = movieData?.popoverData["watch/providers"]?.results?.US

  if(movieProviders !== undefined && movieProviders !== null){
    function Providers(props){
      const platformType = props.type.toLowerCase()
      let buttonName = props.type
      if(buttonName === 'Flatrate'){
        buttonName = 'Stream'
      }
     try {
        if(movieProviders?.[platformType]?.length > 0){
          const providersPopover = (
            <Popover id="popover-basic" >
              <Popover.Body >
                    <ul>
                      {movieProviders?.[platformType]?.map((item, index) => (
                        <li key={index} className='watch-providers-logo-and-name-container'>
                          {<img className='watch-providers-logo'
                            src={`https://image.tmdb.org/t/p/w200${item.logo_path}`}
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
              <div className='streaming-button-container'>
                <Button style={{fontSize: 15}} >{buttonName}</Button>
              </div>
            </OverlayTrigger>
        </>
      )}
    } catch (error) {
    }
  }
  
    return (
      <>
        <h6 style={{fontWeight: 'bold'}}>&#8595; Where to watch &#8595;</h6>
        <div className='providers-container'>
          <Providers type={"Buy"}  />
          <Providers type={"Rent"} /> 
          <Providers type={"Flatrate"}/>
          <Providers type={"Free"}/>
        </div>
      </>
    )
  }
  if(movieProviders === undefined || movieProviders === null){
    return (
      <>
        <h6>&#8595; Where to watch &#8595;</h6>
        <h6>Sorry no streaming options.  </h6>
      </>
    )
  }
}
