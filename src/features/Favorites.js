import {useSelector, useDispatch } from "react-redux"
import {useState, useEffect} from 'react'
import {weatherState, getCurFavs, removeFav} from './weatherSlice.js';
import { Grid, Button, Card, CardContent, Typography} from '@mui/material';

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

    const handleClick = (name) => {
        dispatch(removeFav({name}))
    }


    return (
        <Grid container spacing={2} sx={{ m: 2, mb:6}}>
        {weather.curfavs.map((item, index) => {
            return <Grid item xs={2} sx={{ mx: 'auto'}} key={index}>
                        <Card sx={{ width: 200 }} key={index}>
                            <CardContent>
                                <Typography variant="h5">{item.name}</Typography>
                                <Typography variant="subtitle1">{item.temp}°C</Typography>
                                <Button onClick={()=>handleClick(item.name)} variant="outlined" sx={{ m: 1 }} size="small">Remove</Button>
                            </CardContent>
                        </Card>
                    </Grid>
        })}
        </Grid>
    )


};

export default Favorites