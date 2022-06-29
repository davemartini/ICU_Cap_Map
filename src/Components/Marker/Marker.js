import pin from "./map_pin_default.png";
import specificPin from "./user_specific_pin.png";


const Marker = ({userSpecific}) => {
  


  
    
    return (
      <div>
        <img style={{
            resizeMode: "contain",
            height: '2vh',
            width: '1vh'
          }} src = {userSpecific? specificPin: pin}/>

      </div>
    );
  };
  export default Marker;