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
        <Grid container xs={12} spacing={2} sx={{ m: 2, mb:6, mr: 'auto', ml: 'auto', width: 1} }>
        {weather.curfavs.map((item, index) => {
            return <Grid item xs={6} sm={3} lg={2} md={3} xl={2} sx={{ mx: 'auto', width: 1}} key={index}>
                        <Card key={index}>
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