import { createSlice } from "@reduxjs/toolkit";
import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY

export const getLatLon = createAsyncThunk('weather/getLatLon', async(query)=>{
    let response = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=1&appid=${API_KEY}`)
    return response.data[0]
})

export const getTemp = createAsyncThunk('weather/getTemp', async(req)=>{
    const {lat, lon} = req
    let response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)    
    return response.data.main
})

export const getForecast = createAsyncThunk('weather/getForecast', async(req)=>{
    const {lat, lon} = req
    let response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)    
    return response.data.list
})

export const getCurFavs = createAsyncThunk('weather/getCurFavs', async(req)=>{
    const {name, lat, lon} = req
    let response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)    
    return {name, temp: response.data.main.temp}
})

const initState = {
    nameTown: '',
    temp: null,
    lat: '',
    lon:'',
    forecast: [],
    favorites:[],
    curfavs:[],
    status: '',
    clicked: false
};

export const weatherSlice = createSlice({
    name: 'weather',
    initialState: initState,
    reducers: {
        setClick: (state) => {
            if (state.clicked === false) {
                state.clicked = true
            } else {
                state.clicked = false
            }
        },
        addFav: (state, action) => {
            console.log(action.payload.name)
            let checkArr = state.favorites.filter(item => item.name === action.payload.name)
            if(checkArr.length === 0) {
                state.favorites.push(action.payload)
                state.curfavs = []
            }

        },
        removeFav: (state, action) => {
            console.log('from remove',action.payload.name)
            let checkFav = state.favorites.filter(item => item.name !== action.payload.name)
            let checkCur = state.curfavs.filter(item => item.name !== action.payload.name)
            state.favorites = checkFav
            state.curfavs = checkCur
        },
    },

    extraReducers(builder){
        builder
        .addCase(getLatLon.fulfilled, (state, action) => {
            // console.log('payload',action.payload)
            if (action.payload !== undefined) {
                state.lat = String(action.payload.lat).slice(0,5)
                state.lon = String(action.payload.lon).slice(0,5)
                console.log(state.lat, state.lon)
                state.nameTown = action.payload.name
                state.status = 'OK'
            } else {
                state.status = 'Not Found'
            }
        })
        .addCase(getTemp.fulfilled, (state, action) => {
            console.log('payload',action.payload)
            state.temp = action.payload
        })
        .addCase(getForecast.fulfilled, (state, action) => {
            console.log('payload',action.payload)
            state.forecast = action.payload
        })

        .addCase(getCurFavs.fulfilled, (state, action) => {
            console.log('payload',action.payload)
            let checkArr = state.curfavs.filter(item => item.name === action.payload.name)
            if (checkArr.length === 0){
                state.curfavs.push(action.payload)
            }
            
        })
    }
})
export const {setClick, addFav, removeFav} = weatherSlice.actions

export default weatherSlice.reducer

export const weatherState = (state)=> state.weather