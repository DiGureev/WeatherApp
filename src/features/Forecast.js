import { useEffect } from "react";
import {useSelector, useDispatch } from "react-redux"
import {weatherState, getForecast, setClick} from './weatherSlice.js'
import Img from "./Img.js"
import { Grid, Button, Card, CardContent, Typography} from '@mui/material';

const Forecast = (props)=>{
    const weather = useSelector(weatherState);
    const dispatch = useDispatch();
    const months = ['Jan', 'Feb', 'Mar', 'Apl', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    useEffect(()=>{
    },[weather.clicked])

    const handleClick = () => {
        console.log('I am here')
        dispatch(setClick())
        dispatch(getForecast({lat: weather.lat, lon: weather.lon}))
    }

    if (weather.clicked) {
        return <Grid container spacing={2}>
                    <Grid item xs={12}><Typography variant="h4">Forecast for 5 days in {weather.nameTown}</Typography></Grid>
                    { weather.forecast && weather.forecast.map((item, index) => {
                        if (weather.forecast[index-1] !== undefined && weather.forecast[index].dt_txt.slice(0,10) === weather.forecast[index-1].dt_txt.slice(0,10) || index === 0){
                            return
                        } else{
                            let date = new Date(item.dt_txt)
                            let day = `${date.getDate()} ${months[date.getMonth()]}`
                            return <Grid item s={2} sx={{ mx: 'auto'}}><Card sx={{ width: 200 }} key={index}>
                                    <CardContent>
                                        <Img temp={item.main.temp}/>
                                        <Typography variant="h4">{day}</Typography>
                                        <Typography variant="subtitle1">
                                            Temprature: {item.main.temp}°C<br/>
                                            Wind Speed: {item.wind.speed}
                                        </Typography>
                                    </CardContent>
                                    </Card>
                                    </Grid>
                        }
                        
            })}
        </Grid>
    } else {
        return <Button onClick={handleClick} variant="contained" type="submit" sx={{ m: 1 }}>Get a forecaste</Button>
    }


};

export default Forecast