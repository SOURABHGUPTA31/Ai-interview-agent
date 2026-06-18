import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name:"user",
    initialState:{
        userData:null
    },

    reducers:{
        setUSerData:(state,action) => {
            state.userData = action.payload
        } 
    }
})


export  const {setUSerData} = userSlice.actions

export default userSlice.reducer
