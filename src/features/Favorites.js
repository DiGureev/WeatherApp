import {useSelector } from "react-redux";
import {useState} from 'react'
import {weatherState} from './weatherSlice.js';
import axios from "axios";

const API_KEY = process.env.API_KEY
//DOESNT WORK

const Favorites = (props) => {
    const weather = useSelector(weatherState);
    const favArr = []

    if (weather.favorites.length !== 0) {
        console.log(weather.favorites)
        weather.favorites.map(async (item) => {
            let lat = item.lat
            let lon = item.lon

            let response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)

            favArr.push({name: item.name, temp: response.data.main.temp})
           })
    }

    return (
        <>
        {favArr && favArr.map((item, index) => {
            return <div key={index}>
                <h4>{item.name}</h4>
                <p>{item.temp}</p>
            </div>
        })}
        </>
    )


};

export default Favorites