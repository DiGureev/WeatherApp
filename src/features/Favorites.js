import {useSelector, useDispatch } from "react-redux"
import {useState, useEffect} from 'react'
import {weatherState, getCurFavs} from './weatherSlice.js';


const Favorites = (props) => {
    const weather = useSelector(weatherState);
    const dispatch = useDispatch()

    console.log(weather.favorites)

    useEffect (() => {
        weather.favorites.map(item=> {
            console.log(item)
            dispatch(getCurFavs({name: item.name, lat: item.lat, lon: item.lon}))
        })
        
        console.log('weather.curfavs',weather.curfavs)
     
    }, [weather.favorites])


    return (
        <>
        {weather.curfavs.map((item, index) => {
            return <div key={index}>
                <h4>{item.name}</h4>
                <p>{item.temp}</p>
            </div>
        })}
        </>
    )


};

export default Favorites