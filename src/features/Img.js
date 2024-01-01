import sun from '../sun.svg';
import rain from '../rain.svg';
import snow from '../snow.svg';
import cloud from '../cloud.svg';
import { useEffect } from 'react';


const Img = (props) => {
    let temp = Math.round(props.temp)

    console.log(temp >= 20)

    useEffect (()=>{

    }, [temp])

    if (temp >= 20) {
       return (
        <img src={sun} />
        ) 
    } else if (temp < 20 && temp >= 15) {
        return (
            <img src={cloud} />
        ) 
    } else if (temp < 15 && temp >= 10) {
        return (
            <img src={rain} />
        ) 
    } else if (temp < 10) {
        return (
            <img src={snow} />
        ) 
    }

}

export default Img