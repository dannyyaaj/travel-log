import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { listLogEntries } from "./API";
import LogEntryForm from "./LogEntryForm";

const App = () => {
  const [logEntries, setLogEntries] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [addEntryLocation, setAddEntryLocation] = useState(null);
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 37.6577,
    longitude: -95.665,
    zoom: 4,
  });

  const getEntries = async () => {
    const logEntries = await listLogEntries();
    setLogEntries(logEntries);
  };

  useEffect(() => {
    getEntries();
  }, []);

  const showAddMarkerPopup = (event) => {
    //destructure pointer event
    const [longitude, latitude] = event.lngLat;
    setAddEntryLocation({
      longitude,
      latitude,
    });
    console.log(event);
  };

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/dannyyaaj/ckb5vtheq3a6n1io35nnkp9hu"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      doubleClickZoom={false}
      onDblClick={showAddMarkerPopup}
    >
      {logEntries.map((entry, index) => (
        <React.Fragment key={entry._id}>
          <Marker latitude={entry.latitude} longitude={entry.longitude}>
            <div
              onClick={() =>
                setShowPopup({
                  [entry._id]: true,
                })
              }
            >
              <svg
                className="marker yellow"
                style={{
                  height: `${5 * viewport.zoom}px`,
                  width: `${5 * viewport.zoom}px`,
                }}
                viewBox="0 0 14 20"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xlink="http://www.w3.org/1999/xlink"
              >
                <g
                  id="Icons"
                  stroke="none"
                  strokeWidth="1"
                  fill="none"
                  fillRule="evenodd"
                >
                  <g
                    id="Rounded"
                    transform="translate(-853.000000, -3168.000000)"
                  >
                    <g id="Maps" transform="translate(100.000000, 3068.000000)">
                      <g
                        id="-Round-/-Maps-/-person_pin_circle"
                        transform="translate(748.000000, 98.000000)"
                      >
                        <g>
                          <polygon
                            id="Path"
                            points="0 0 24 0 24 24 0 24"
                          ></polygon>
                          <path
                            d="M12,2 C8.14,2 5,5.14 5,9 C5,13.17 9.42,18.92 11.24,21.11 C11.64,21.59 12.37,21.59 12.77,21.11 C14.58,18.92 19,13.17 19,9 C19,5.14 15.86,2 12,2 Z M12,4 C13.1,4 14,4.9 14,6 C14,7.11 13.1,8 12,8 C10.9,8 10,7.11 10,6 C10,4.9 10.9,4 12,4 Z M12,14 C10.33,14 8.86,13.15 8,11.85 C8.02,10.53 10.67,9.8 12,9.8 C13.33,9.8 15.98,10.53 16,11.85 C15.14,13.15 13.67,14 12,14 Z"
                            id="🔹-Icon-Color"
                          ></path>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
          </Marker>
          {showPopup[entry._id] ? (
            <Popup
              key={index}
              latitude={entry.latitude}
              longitude={entry.longitude}
              closeButton={true}
              closeOnClick={false}
              dynamicPosition={true}
              onClose={() => setShowPopup({})}
              anchor="top"
            >
              <div className="popup">
                <h3>{entry.title}</h3>
                <p>{entry.comments}</p>
                <p>{entry.description}</p>
                <p>
                  {entry.rating ? `rating: ${entry.rating}` : null}
                </p>
                <small>
                  Visited on: {new Date(entry.visitDate).toLocaleDateString()}
                </small>

                {entry.image ? <img src={entry.image} alt={entry.title} /> : null}
              </div>
            </Popup>
          ) : null}
        </React.Fragment>
      ))}
      {addEntryLocation ? (
        <>
          <Marker
            latitude={addEntryLocation.latitude}
            longitude={addEntryLocation.longitude}
          >
            <div>
              <svg
                className="marker red"
                style={{
                  height: `${5 * viewport.zoom}px`,
                  width: `${5 * viewport.zoom}px`,
                }}
                viewBox="0 0 14 20"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xlink="http://www.w3.org/1999/xlink"
              >
                <g
                  id="Icons"
                  stroke="none"
                  strokeWidth="1"
                  fill="none"
                  fillRule="evenodd"
                >
                  <g
                    id="Rounded"
                    transform="translate(-853.000000, -3168.000000)"
                  >
                    <g id="Maps" transform="translate(100.000000, 3068.000000)">
                      <g
                        id="-Round-/-Maps-/-person_pin_circle"
                        transform="translate(748.000000, 98.000000)"
                      >
                        <g>
                          <polygon
                            id="Path"
                            points="0 0 24 0 24 24 0 24"
                          ></polygon>
                          <path
                            d="M12,2 C8.14,2 5,5.14 5,9 C5,13.17 9.42,18.92 11.24,21.11 C11.64,21.59 12.37,21.59 12.77,21.11 C14.58,18.92 19,13.17 19,9 C19,5.14 15.86,2 12,2 Z M12,4 C13.1,4 14,4.9 14,6 C14,7.11 13.1,8 12,8 C10.9,8 10,7.11 10,6 C10,4.9 10.9,4 12,4 Z M12,14 C10.33,14 8.86,13.15 8,11.85 C8.02,10.53 10.67,9.8 12,9.8 C13.33,9.8 15.98,10.53 16,11.85 C15.14,13.15 13.67,14 12,14 Z"
                            id="🔹-Icon-Color"
                          ></path>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
          </Marker>
          <Popup
            latitude={addEntryLocation.latitude}
            longitude={addEntryLocation.longitude}
            closeButton={true}
            closeOnClick={false}
            dynamicPosition={true}
            onClose={() => setAddEntryLocation(null)}
            anchor="top"
          >
            <div className="popup">
              <LogEntryForm
                onClose={() => {
                  setAddEntryLocation(null);
                  getEntries();
                }}
                location={addEntryLocation}
              />
            </div>
          </Popup>
        </>
      ) : null}
    </ReactMapGL>
  );
};

export default App;
