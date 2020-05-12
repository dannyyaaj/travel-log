import React from 'react';
import { useState } from 'react';
import ReactMapGL from 'react-map-gl';

const App = () => {
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 37.6577,
    longitude: -95.665,
    zoom: 4,
  });
  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN} 
      onViewportChange={nextViewport => setViewport(nextViewport)}
    />
  );
}

export default App;
