import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
//protected routes
const ProtectedRoute = () => {
 const navigate = useNavigate();
 const data=useSelector((state)=>state.user.token)
 return !data?<Outlet/>:navigate("/")
}

export default ProtectedRoute