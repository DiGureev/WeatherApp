import { useSelector, useDispatch } from "react-redux"
import { useEffect} from "react"
import {weatherState, getLatLon, setClick} from './weatherSlice.js'
import CityCard from './CityCard.js'
import { Box, TextField, Button } from '@mui/material';


const Main = (props) => {
    const weather = useSelector(weatherState);
    const dispatch = useDispatch();
    // const query = useRef()

    useEffect(()=>{

    }, [weather.favorites])

const handleSubmit = (e) => {
    e.preventDefault()
    let query = e.target.search.value
    dispatch(getLatLon(query))

    if (weather.clicked === true) {
        dispatch(setClick())
    }

}

return (
    <Box sx={{ mx: 'auto'}}>
        <form onSubmit={(e) => handleSubmit(e)}>
            <TextField id="outlined-basic" label="Search" variant="outlined" name="search" required size="small"/>
            <Button variant="contained" type="submit" sx={{ ml: 1 }}>Search</Button>
        </form>

    <CityCard/>

    </Box>
)

};

export default Main