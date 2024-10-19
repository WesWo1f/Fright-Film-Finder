import React from 'react'
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import NetflixIcon from '../logos/netflix-icon.jpg';
import HBOMaxIcon from '../logos/HBO-Max-icon.jpg';
import HuluIcon from '../logos/hulu-icon.jpg';
import AmazonPrimeVideoIcon from '../logos/Amazon-Prime-Video.jpg';
import { useEffect } from 'react';

const streamingServices = [
  { name: 'Netflix', providerId: '8', icon: NetflixIcon },
  { name: 'HBO', providerId: '1899', icon: HBOMaxIcon },
  { name: 'Hulu', providerId: '15', icon: HuluIcon },
  { name: 'Amazon Prime', providerId: '9', icon: AmazonPrimeVideoIcon }
];

export default function StreamingServices({ onSelectedServicesChange }){
const [streamingServiceAndProviderIds, setStreamingServiceAndProviderIds] = useState([]);


  useEffect(() => {
    onSelectedServicesChange(streamingServiceAndProviderIds);
  }, [streamingServiceAndProviderIds, onSelectedServicesChange]);

const handleStreamingServiceSelect = (service) => () => {
    if(streamingServiceAndProviderIds.some(s => s.providerId === service.providerId)){
      setStreamingServiceAndProviderIds(streamingServiceAndProviderIds.filter(s => s.providerId !== service.providerId))
    } else {
      setStreamingServiceAndProviderIds([...streamingServiceAndProviderIds, service])
    }
  };


  return (
    <>
      {streamingServices.map((service) => (
        <Button
          key={service.name}
          onClick={handleStreamingServiceSelect(service)}
          variant={streamingServiceAndProviderIds.some(s => s.providerId === service.providerId) ? "primary" : "outline-primary"}
          style={{ display: 'flex', alignItems: 'center', margin: '5px' }}
        >
          <img src={service.icon} alt={service.name} style={{ width: '20px', marginRight: '10px' }} />
          {service.name}
        </Button>
      ))}
    </>
  );
}
