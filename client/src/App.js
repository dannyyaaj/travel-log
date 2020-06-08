import React, { useState, useEffect } from 'react';
import ReactMapGL from 'react-map-gl';
import { listLogEntries } from './API';

const App = () => {
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 37.6577,
    longitude: -95.665,
    zoom: 4,
  });

  useEffect(() => {
    (async () => {
      const logEntries = await listLogEntries();
      console.log(logEntries);
    })()
  }, [])


  return (
    <ReactMapGL
      {...viewport}
      mapStyle = "mapbox://styles/dannyyaaj/ckb5vtheq3a6n1io35nnkp9hu"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN} 
      onViewportChange={nextViewport => setViewport(nextViewport)}
    />
  );
}

export default App;
