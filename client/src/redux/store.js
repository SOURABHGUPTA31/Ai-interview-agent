import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./userSlice"
import { UNSAFE_getTurboStreamSingleFetchDataStrategy } from "react-router-dom"

export default configureStore({
    reducer: {
      user:userSlice
    },
})