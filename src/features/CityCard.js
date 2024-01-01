import {useSelector, useDispatch } from "react-redux"
import {useEffect, useState} from 'react'
import {weatherState, getTemp, addFav} from './weatherSlice.js'
import Forecast from './Forecast.js'

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
            <p>Today's temprature in {weather.nameTown}: {weather.temp && weather.temp.temp}</p>
            <p>Feels like: {weather.temp && weather.temp.feels_like}</p>
            <p>Max temprature: {weather.temp && weather.temp.temp_max}</p>
            <p>Min temprature: {weather.temp && weather.temp.temp_min}</p>
            <button onClick={(handleClick)}>Add to Favorite</button><br/>
            <Forecast/>
            </div>
    }

};

export default CityCard