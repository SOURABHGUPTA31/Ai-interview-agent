import React, { useEffect, useState } from 'react'
import {motion} from 'motion/react'
import{BsRobot,BsCoin} from 'react-icons/bs'
import{HiOutlineLogout} from 'react-icons/hi'
import{FaUserAstronaut} from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ServerUrl } from '../App'
import { linkWithCredential } from 'firebase/auth'
import { setUSerData } from '../redux/userSlice'
import axios from 'axios'
import AuthModel from './AuthModel'

function Navbar(){


    const [showCreditPopup, setshowCreditPopup] = useState(false)
    const [showUserPopup, setShowUserPopup] = useState(false)
    const [showAuth, setShowAuth] = useState(false)
    const dispatch = useDispatch()
    const navigate= useNavigate()

    const handleLogout = async () => {
        try {
            await axios.get(ServerUrl + "/api/auth/logout", 
                {withCredentials:true})
                dispatch(setUSerData(null))
                setShowUserPopup(false)
                setshowCreditPopup(false)
                navigate("/")
        } catch (error) {
            console.log(error)
        }
    }

    const {userData} = useSelector((state) => state.user)
return (
    <div className='bg-[#f3f3f3] flex justify-center px-6 pt-6 '>
        <motion.div 
        initial={{opacity:0 , y:-40}}
        animate={{opacity:1 , y:0}}
        transition={{duration:0.3}}
        className='w-full max-w-6xl bg-white rounded-[24px] shadow-5m border border-gray-200 px-8 py-4 flex justify-between items-center relatives  '>

             <div className='flex items-center gap-3 cursor-pointer'>
            <div className='bg-black text-white p-2 rounded-lg'>
                <BsRobot size={18}/>
            </div>
            <h1 className='font-semibold hiden md:block text-lg'>InterviewAgent.AI</h1>
        </div>

        <div className='flex item-center gap-6  relative'>
            <div className='relative'>
                <button onClick={()=> {
                    if(!userData){
                        setShowAuth(true)
                        return;
                    }
                    setshowCreditPopup(!showCreditPopup);
                    setShowUserPopup(false)}} className='flex items-center gap-2 bg-gray-100 px-4 py-2  rounded-full text-md hover:bg-gray-200 transition'>
                    <BsCoin size={20}/>
                    {userData?.credits || 0}
                </button>

                {showCreditPopup && (
                    <div className='absolute right-[50px] mt-3 w-64 bg-white shadow-xl border border-gray-200 rounded p-5 z-50'>
                        <p className='text-sm text-gray-600 mb-4 '>Need more credits to continue interviews?</p>

                        <button onClick={() => navigate("/pricing")} className='w-full bg-black text-white py-2 rounde-lg text-sm'>Buy more credits</button>
                    </div>
                )}
            </div>

             <div className='relative'>
            <div className='relative'>
                <button onClick={() =>{
                    if(!userData){
                        setShowAuth(true)
                        return;
                    }
                    setShowUserPopup(!showUserPopup); setshowCreditPopup(false)}} className='w-9 h-9 bg-black text-white  rounded-full flex items-center justify-center font-semibold'>
                    {userData ? userData.name.slice(0,1).toUpperCase() : <FaUserAstronaut size={16}/>}
                </button>

                {showUserPopup && (
                   <div className='absolute right-0 mt-3 w-56 bg-white shadow-xl border border-gray-200 rounded-xl p-4 z-50'>
                        <p className='text-md text-blue-500 font-medium mb-1'>{userData?.name}</p>

                        <button onClick={() => navigate("/history")} className='w-full text-left text-sm py-2 hover:text-black text-gray-600'> InterView History </button>
                        
                        <button onClick={handleLogout} className='w-full text-left text-sm py-2 flex items-center gap-2 text-red-500 '>
                            <HiOutlineLogout/>
                            Logout</button>
                    </div>
                )}
            </div>


        </div>


       
        </div>



        </motion.div>

        {showAuth && <AuthModel onClose={() => setShowAuth(false)}/>}
       

    </div>
)
}


export default Navbar