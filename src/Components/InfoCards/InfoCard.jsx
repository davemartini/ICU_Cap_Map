import { Paper, Typography, Card, CardContent} from '@material-ui/core';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const InfoCard = (props) => {

  const chartData = [
    {
      name:"Capacity",
      Available: Math.floor(props.icu_bed_available),
      Occupied: Math.floor(props.icu_beds_used)

    }
  ];
  const updateTime = new Date(props.lastUpdatedTime);
  const dateTimeString = updateTime.getFullYear()+"-"+(updateTime.getMonth()+1)+"-"+updateTime.getDate();
  return (
    
    <div style={{ height: "10vh", width: "15vw"}}>
    

      <Paper elevation={24}>
        
        <Card >
          <CardContent>
            <Typography component={'span'} variant="body2" gutterBottom >
              <div>
                Hospital Name: {props.passed_place}
              </div>
                
              <div>
                 ICU Bed Capacity: {Math.floor(props.icu_bed_available)}
              </div>

              <div>
                ICU Bed Occupied: {Math.floor(props.icu_beds_used)}
                
              </div> 
              {/* fix height bug when window is resized really small -- width has an issue for the chart component */}
              <ResponsiveContainer width= "80%" height= {120} > 
              <BarChart max-height={200} data={chartData} layout = "horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Legend />
                <Bar dataKey="Available" fill="#8884d8" />
                <Bar dataKey="Occupied" fill="#82ca9d" />
              </BarChart>
              </ResponsiveContainer>
            </Typography>
            
 
          </CardContent>
          <div style={{fontsize: "6px"}}>
                Last Updated: {dateTimeString}
              </div>
        </Card>
      </Paper>

    </div>


  )
}



export default InfoCard;