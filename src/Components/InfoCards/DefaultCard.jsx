import { Paper, Typography, Card, CardContent } from '@material-ui/core';


const DefaultCard = () => {
    return (

        <div style={{ height: "10vh", width: "8vw" }}>


            <Paper elevation={24}>

                <Card >
                    <CardContent>
                        <Typography component={'span'} variant="body2" gutterBottom >
                            <div>
                                Your Location
                            </div>
                        </Typography>

                    </CardContent>

                </Card>
            </Paper>

        </div>
    )
}



export default DefaultCard;