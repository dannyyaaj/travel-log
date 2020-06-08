import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { listLogEntries } from "./API";

const App = () => {
  const [logEntries, setLogEntries] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 37.6577,
    longitude: -95.665,
    zoom: 4,
  });

  useEffect(() => {
    (async () => {
      const logEntries = await listLogEntries();
      setLogEntries(logEntries);
    })();
  }, []);

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/dannyyaaj/ckb5vtheq3a6n1io35nnkp9hu"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      {logEntries.map((entry, index) => (
        <>
          <Marker
            key={entry._id}
            latitude={entry.latitude}
            longitude={entry.longitude}
          >
            <div
              onClick={() =>
                setShowPopup({
                  ...showPopup,
                  [entry._id]: true,
                })
              }
            >
              <img
                className="marker"
                style={{
                  height: `${5 * viewport.zoom}px`,
                  width: `${5 * viewport.zoom}px`,
                }}
                src="https://i.imgur.com/y0G5YTX.png"
                alt="marker"
              />
            </div>
          </Marker>
          {showPopup[entry._id] ? (
            <Popup
              key={index}
              latitude={entry.latitude}
              longitude={entry.longitude}
              closeButton={true}
              closeOnClick={false}
              onClose={() => setShowPopup({
                ...showPopup,
                [entry._id]: false
              })
              
              }
              anchor="top"
            >
              <div>
                <h3>{entry.title}</h3>
                <p>{entry.comments}</p>
                <p>{entry.description}</p>
              </div>
            </Popup>
          ) : null}
        </>
      ))}
    </ReactMapGL>
  );
};

export default App;
