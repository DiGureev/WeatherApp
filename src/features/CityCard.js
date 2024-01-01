import {useSelector, useDispatch } from "react-redux"
import {useEffect, useState} from 'react'
import {weatherState, getTemp, addFav} from './weatherSlice.js'
import Forecast from './Forecast.js'
import Img from "./Img.js"
import { Button, Card, CardContent, Typography} from '@mui/material';

const CityCard = (props) => {
    const weather = useSelector(weatherState);
    const dispatch = useDispatch();
    const [msg,setMsg] = useState('')

    useEffect(()=>{
        setMsg('')

        if (weather.status == 'OK') {
        console.log('i am here')
        dispatch(getTemp({lat: weather.lat, lon: weather.lon}))
        }  else if (weather.status == 'Not Found'){
            console.log(weather.status)
            setMsg('This city doesnt exist')
        }
    },[weather.nameTown])

    const handleClick = () => {
        dispatch(addFav({name: weather.nameTown, lat: weather.lat, lon: weather.lon}))
    }


    if (msg !== '') {
        return <div>{msg}</div>
    } else if (!weather.temp) {
        <div></div>
    } else {
        return <div>
            <Card sx={{ width: 275, mr: 'auto', ml:'auto', mt:2, mb:2}}>
                <CardContent>
                    <Img temp={weather.temp.temp}/>
                    <Typography variant="h4">{weather.nameTown}</Typography>
                    <Typography variant="h5">{weather.temp && weather.temp.temp}°C</Typography>
                    <Typography variant="subtitle1">
                        Feels like: {weather.temp && weather.temp.feels_like}°C<br/>
                        Max: {weather.temp && weather.temp.temp_max}°C<br/>
                        Min: {weather.temp && weather.temp.temp_min}°C
                    </Typography>
                </CardContent>
            </Card>

            <Button onClick={handleClick} variant="contained" type="submit" sx={{ m: 1 }}>Add to Favorite</Button>
            <Forecast/>
            
            </div>
    }

};

export default CityCard