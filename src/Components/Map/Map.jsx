import React from 'react';
import { useEffect,useState } from 'react';
import GoogleMapReact from 'google-map-react';
import {getPlacesData} from "../../API.js";
import mapStyles from './MapStyles.js';
import useStyles from './Styles.js';
import Marker from '../Marker/Marker.js';
import InfoCard from "../InfoCards/InfoCard.jsx";
import DefaultCard from '../InfoCards/DefaultCard.jsx';




const Map = ({userCoords, placeFunc,cenLocFunc}) => {
  


  
const classes = useStyles();



const [placesCenter, setPlacesCenter] = useState(userCoords);
const[currentCenter, setCenter] = useState(userCoords);

const [places, setPlaces] = useState([]);

const[selectedHos, setSelectedHos] = useState(null);
const[placeInfo, setPlaceInfo] = useState(null);

const [userSpecific, setUserSpecific] = useState(null);

useEffect(() => {
  
  getPlacesData(userCoords.lat, userCoords.lng).then((data) => {
    //console.log(data);
    setPlaces(data);
    placeFunc(data);

  })
  
}, []);

useEffect(() => {
  cenLocFunc(currentCenter);
  
  if(currentCenter.lat > (placesCenter.lat +3) || currentCenter.lat < (placesCenter.lat - 3) || currentCenter.lng > (placesCenter.lng+3) || currentCenter.lng < (placesCenter.lng-3)){
    setPlacesCenter(currentCenter);
    
    getPlacesData(currentCenter.lat, currentCenter.lng).then((data) => {
      setPlaces(data);
      placeFunc(data);
      
  
    })
  }
  
}, [currentCenter]);
 


  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'XXXXXXXXXXXXXXX' }}
        gestureHandling = {'greedy'}
        center={userCoords}
        defaultZoom={10}
        clickableIcons = {'false'}
        margin={[50, 50, 50, 50]}
        onChange = {(e) => {
          setCenter({lat: e.center.lat, lng: e.center.lng})
          //console.log({lat: e.center.lat, lng: e.center.lng});
        }
      }
        onChildMouseEnter={(hospital) => { if(hospital == 9999999999){
          setUserSpecific(true);
        } 
        else{ places.forEach(element => {
          if (element.attributes.ccn == hospital) {
            setPlaceInfo(element);
            setSelectedHos(hospital);
            //setSelectedHos(hospital);
          }//setHos to this key 

        }) }
      }}
      onChildMouseLeave = {() => {
        setSelectedHos(null);
        setUserSpecific(false);
      }}
        //yesIWantToUseGoogleMapApiInternals
        options={{ disableDefaultUI: true, zoomControl: true, styles: mapStyles }}
      >
        <Marker
        lat={userCoords.lat}
        lng={userCoords.lng}
        userSpecific={true}
        key={9999999999}
        />
        
        {places.map((hospital) => (
          <Marker 
          userSpecific={false}
          animation={2}
          key={hospital.attributes.ccn} 
          lat = {hospital.attributes.Y}
          lng= { hospital.attributes.X}
          style = {{position: 'absolute', transform: 'translate(-50%, -100%)'}}
          
      
          />
        ))}
        {selectedHos && (

          <InfoCard
          lat = {placeInfo.attributes.Y}
          lng = {placeInfo.attributes.X}
          passed_place = {placeInfo.attributes.hospital_name}
          icu_bed_available = {placeInfo.attributes.total_icu_beds_7_day_avg}
          icu_beds_used = {placeInfo.attributes.icu_beds_used_7_day_avg}
          lastUpdatedTime = {placeInfo.attributes.last_updated}
          />
        )

        }
        {userSpecific && (
          <DefaultCard
          lat={userCoords.lat}
          lng={userCoords.lng}
          />
          

        )

        }



      </GoogleMapReact>
    </div>
  );
  
};

export default Map;