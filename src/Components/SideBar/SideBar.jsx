import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader } from 'react-pro-sidebar';
import './styles.css';
import { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import hosIco from "./house-medical-solid.svg";
import haversine from 'haversine-distance';




const SideBar = ({ currentMapPlaces, passedCoords, specificCenter }) => {

    const [collapsed, setCollapsed] = useState(true);
    const [places, setPlaces] = useState([]);

    // const [currentCenter, setCurrentCenter] = useState();

    useEffect(() => {
        setPlaces(currentMapPlaces);

    }, [currentMapPlaces]);

    // useEffect(() => {
    //     setCurrentCenter(passedCoords);
    // }, [passedCoords]);

    useEffect(() => {
        //console.log(specificCenter)
        places.sort((a, b) => haversine({latitude: specificCenter.lat, longitude: specificCenter.lng}, {latitude:a.attributes.Y, longitude:a.attributes.X }) < haversine({latitude: specificCenter.lat, longitude: specificCenter.lng}, {latitude:b.attributes.Y, longitude:b.attributes.X }) ? -1 : haversine({latitude: specificCenter.lat, longitude: specificCenter.lng}, {latitude:a.attributes.Y, longitude:a.attributes.X }) > haversine({latitude: specificCenter.lat, longitude: specificCenter.lng}, {latitude:b.attributes.Y, longitude:b.attributes.X }) ? 1 : 0);
        //newSort();


    }, [specificCenter]);

    useEffect(() => {
        //console.log(specificCenter)
        places.sort((a, b) => haversine({latitude: specificCenter.lat, longitude: specificCenter.lng}, {latitude:a.attributes.Y, longitude:a.attributes.X }) < haversine({latitude: specificCenter.lat, longitude: specificCenter.lng}, {latitude:b.attributes.Y, longitude:b.attributes.X }) ? -1 : haversine({latitude: specificCenter.lat, longitude: specificCenter.lng}, {latitude:a.attributes.Y, longitude:a.attributes.X }) > haversine({latitude: specificCenter.lat, longitude: specificCenter.lng}, {latitude:b.attributes.Y, longitude:b.attributes.X }) ? 1 : 0);
        //newSort();


    }, [specificCenter && places]);


 function lastSort() {
     const fullSlice = places.slice();
     fullSlice.sort((a, b) => a.attributes.hospital_name < b.attributes.hospital_name ? -1 : a.attributes.hospital_name > b.attributes.hospital_name ? 1 : 0)
     setPlaces(fullSlice);
     
 }

 function newSort() {
    
    const thisSlice = places.slice();
    thisSlice.sort((a, b) => haversine({latitude: specificCenter.lat, longitude: specificCenter.lng}, {latitude:a.attributes.Y, longitude:a.attributes.X }) < haversine({latitude: specificCenter.lat, longitude: specificCenter.lng}, {latitude:b.attributes.Y, longitude:b.attributes.X }) ? -1 : haversine({latitude: specificCenter.lat, longitude: specificCenter.lng}, {latitude:a.attributes.Y, longitude:a.attributes.X }) > haversine({latitude: specificCenter.lat, longitude: specificCenter.lng}, {latitude:b.attributes.Y, longitude:b.attributes.X }) ? 1 : 0);
    setPlaces(thisSlice);
    
}


    return (
        <div style={{
            height: "93.4vh"
        }}>
            <ProSidebar
                onMouseLeave={() => setCollapsed(true)}
                onMouseEnter={() => setCollapsed(false)}
                collapsed={collapsed}
                width={270}
                collapsedWidth={100}
                style={{whiteSpace: 'nowrap'}}
                
            >
                <SidebarHeader>
                {collapsed ? <img style={{ width:50, height:50, margin: 15
                        }} src={hosIco} /> : ""}
                    <div
                        style={{
                            
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            fontSize: 14,
                            letterSpacing: '1px',
                            overflow: 'hidden',
                            // textOverflow: 'ellipsis',
                            whiteSpace: 'normal',
                           display:"flex",
                            textAlign: "center",
                            justifyContent:"center"
                        }}
                    >
                        
                        {collapsed? "" : "Hospitals On Map"}
                        
                        
                        <div style={{display: "flex", padding: 2,  textAlign: "center",}}>
                        <Button variant="contained" onClick={lastSort} size ={'small'} style={{visibility: collapsed? "hidden" : "visible", float: "left", padding: 5, margin: 2}}> A-Z</Button>
                        <Button variant="contained" onClick={newSort} size={'small'} style={{visibility: collapsed? "hidden" : "visible", textAlign: "center", padding: 5, margin: 2}}> Distance</Button>
  
                        </div>
                    </div>
                    
                </SidebarHeader>

                <Menu iconShape="square">
                    {places.map((hospital) => {
                        return (
                            <div  key={hospital.attributes.ccn} style={{padding: 2, borderBottom: "1px groove grey"}}>
                                <MenuItem
                                   
                                    // onClick={() => console.log("menu item clicked")} //figure something out for click maybe at some point
                                >
                                    {hospital.attributes.hospital_name}
                                </MenuItem>

                                <SubMenu title="Details" >
                                    <MenuItem style={{whiteSpace: "normal"}}>
                                        Capacity: {Math.floor(hospital.attributes.total_icu_beds_7_day_avg)}
                                    </MenuItem>
                                    <MenuItem>
                                        Occupied: {Math.floor(hospital.attributes.icu_beds_used_7_day_avg)}
                                    </MenuItem>
                                    <MenuItem >
                                        Address: {hospital.attributes.address}, {hospital.attributes.city}, {hospital.attributes.state}, {hospital.attributes.zip_code}
                                    </MenuItem>
                                    <MenuItem >
                                        Beds Available: {Math.floor(hospital.attributes.total_icu_beds_7_day_avg) - Math.floor(hospital.attributes.icu_beds_used_7_day_avg)}
                                    </MenuItem>

                                </SubMenu>
                            </div>




                        )
                    })}
                </Menu>
            </ProSidebar>
        </div>

    );
};
export default SideBar;