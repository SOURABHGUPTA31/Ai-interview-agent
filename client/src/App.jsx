import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import { useEffect } from "react";
import {useDispatch} from "react-redux"
import { setUSerData } from "./redux/userSlice";
import axios from "axios"

export const ServerUrl = "http://localhost:3000"

function App(){
  
    const dispatch  = useDispatch()

  useEffect(() => {
  const getUser = async () => {
    try {
      const result = await axios.get(
        ServerUrl + "/api/user/current-user",
        {
          withCredentials: true,
        }
      );

      dispatch(setUSerData(result.data))
      console.log(result.data)
    } catch (error) {
      console.log(error);
      dispatch(setUSerData(null))
    }
  };

  getUser();
}, [dispatch]);


   return (
    <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/auth' element={<Auth/>} />
    </Routes>
   )
}

export default App