
import React, { useState, useEffect } from 'react';
import { CssBaseline } from "@material-ui/core";
import Header from './Components/Header/Header';
import Map from './Components/Map/Map';
import SideBar from './Components/SideBar/SideBar';

function App() {
  
const [autocomplete, setAutocomplete] = useState(null); 

const [coords, setCoords] = useState({
    lat: 38.89, lng: -77.04 
  });



const [places, setPlaces] = useState([]); 

const[asideCent, setAsideCent] = useState(coords);
const[specificCenter, setSpecificCenter] = useState(coords);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoords({ lat: latitude, lng: longitude });
      setSpecificCenter({ lat: latitude, lng: longitude});
    });
  }, []); 

  const onLoad = (autoC) => setAutocomplete(autoC); //test

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();

    setCoords({lat:lat, lng:lng});
    setSpecificCenter({ lat: lat, lng: lng});

  }; //test
  
  const pull_data = (data) => {
    
    setPlaces(data);
   
  }
  const pull_center = (cenLoc) => {
   
    setAsideCent(cenLoc);
    
  }

  return (
    <>

      <CssBaseline />

      <Header onPlaceChanged={onPlaceChanged} onLoad={onLoad}/>

      <div style= {{
        display: "flex",
        position: "relative" ,
        height: "100%",
        }}>
      
      <Map
        userCoords={coords}
        placeFunc={pull_data}
        cenLocFunc={pull_center}
      //places={places}
      />
      <SideBar
      currentMapPlaces = {places}
      passedCoords={asideCent}
      specificCenter={specificCenter}
      />
      </div>
    </>
  );
}

export default App;
