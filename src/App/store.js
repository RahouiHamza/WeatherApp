import { configureStore } from "@reduxjs/toolkit";
import WatherApiReducer from "../features/WatherApi/WatherApiSlice"

export default configureStore({
    reducer:{wather:WatherApiReducer},
})