/* eslint-disable consistent-return */

import axios from 'axios';


export const getPlacesData = async (latitudeY,longitudeX) => {

const longitudeLowerBound = Math.ceil(longitudeX-4); 
const longitudeUpperBound = Math.ceil(longitudeX+4);

const lattitudeLowerBound = Math.ceil(latitudeY-2);
const lattitudeUpperBount = Math.ceil(latitudeY +2);
const formatURL = "https://services5.arcgis.com/qWZ7BaZXaP5isnfT/arcgis/rest/services/Weekly_Hospital_Capacity/FeatureServer/0/query?where=total_icu_beds_7_day_avg%20%3E%3D%201%20AND%20total_icu_beds_7_day_avg%20%3C%3D%20999999%20AND%20icu_beds_used_7_day_avg%20%3E%3D%200%20AND%20icu_beds_used_7_day_avg%20%3C%3D%2099999%20AND%20X%20%3E%3D%20"+longitudeLowerBound+"%20AND%20X%20%3C%3D%20"+longitudeUpperBound+"%20AND%20Y%20%3E%3D%20"+lattitudeLowerBound+"%20AND%20Y%20%3C%3D%20"+lattitudeUpperBount+"&outFields=X,Y,hospital_name,address,city,zip_code,last_updated,total_icu_beds_7_day_avg,icu_beds_used_7_day_avg,ccn,state&outSR=4326&f=json"

  try{
    const {data: {features}} = await axios.get(formatURL);
    
    return features;
  }
  catch(error){
    console.log(error)
    
  }
}




  
  



