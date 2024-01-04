import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import ApiKey from "../../API/ApiKey";

export const fetchWather = createAsyncThunk("ApiWathere", async () => {
    const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    const { latitude, longitude } = position.coords;
    const geoLocationApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${ApiKey}`;

    const response = await axios.get(geoLocationApiUrl);
    const temp = Math.round(response.data.main.temp - 272.15);
    const min = Math.round(response.data.main.temp_min - 272.15);
    const max = Math.round(response.data.main.temp_max - 272.15);
    const description = response.data.weather[0].description;
    const icon = response.data.weather[0].icon;
    const cityName = response.data.name;
    console.log(response)
    return {
        number: temp,
        description,
        min,
        max,
        icon,
        name: cityName,
    };

});
const WatherApiSlice = createSlice({
    name: "watherApi",
    initialState: {
        result: "empty",
        watherData: {},
        isLoading:false,
    },
    reducers: {
        changeResult: (state, action) => {
            state.result = "changed";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWather.pending, (state, action) => {
                state.isLoading = true;
                console.log("state : " , state , action)
            })
            .addCase(fetchWather.fulfilled, (state, action) => {
                state.isLoading = false;
                state.watherData = action.payload;

            })
            .addCase(fetchWather.rejected , (state , action)=>{
                state.isLoading = false;
            })
    },
})

export const { changeResult } = WatherApiSlice.actions;
export default WatherApiSlice.reducer;