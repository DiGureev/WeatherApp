import { useState, useEffect } from "react";
import {useSelector, useDispatch } from "react-redux"
import {weatherState, getForecast, setClick} from './weatherSlice.js'
import Img from "./Img.js"

const Forecast = (props)=>{
    const weather = useSelector(weatherState);
    const dispatch = useDispatch();

    useEffect(()=>{
    },[weather.clicked])

    const handleClick = () => {
        console.log('I am here')
        dispatch(setClick())
        dispatch(getForecast({lat: weather.lat, lon: weather.lon}))
    }

    if (weather.clicked) {
        return <div>
            <h2>Forecast for 5 days in {weather.nameTown}</h2>
            { weather.forecast && weather.forecast.map((item, index) => {
                if (weather.forecast[index-1] !== undefined && weather.forecast[index].dt_txt.slice(0,10) === weather.forecast[index-1].dt_txt.slice(0,10)){
                    return
                } else{
                    let date = new Date(item.dt_txt)
                    let day = `${date.getDate()}.${date.getMonth()+1}`
                    return <div key={index}>
                            <Img temp={item.main.temp}/>
                            <h3>{day}</h3>
                            <p>Temprature: {item.main.temp}</p>
                            <p>Wind Speed: {item.wind.speed}</p>
                        </div>
                }
                
            })}
        </div>
    } else {
        return <button onClick={handleClick}>Get a forecast</button>
    }


};

export default Forecast