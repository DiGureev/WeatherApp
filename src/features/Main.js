import { useSelector, useDispatch } from "react-redux"
import { useRef } from "react"
import {weatherState, getLatLon, setClick} from './weatherSlice.js'
import CityCard from './CityCard.js'
import Favorites from './Favorites.js'

const Main = (props) => {
    const weather = useSelector(weatherState);
    const dispatch = useDispatch();
    const query = useRef()

const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(getLatLon(query.current.value))

    if (weather.clicked === true) {
        dispatch(setClick())
    }

}

return (
    <div>
    <div><Favorites/></div>
        <form onSubmit={(e) => handleSubmit(e)}>
            <input name="search" type="text" ref={query}/>
            <button type="submit">Search</button>
        </form>

    <div><CityCard/></div>

    </div>
)

};

export default Main