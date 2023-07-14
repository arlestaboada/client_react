import React from 'react'
import { useSelector } from 'react-redux'
import {  Navigate } from 'react-router-dom'

export default function PrivateRoute(
    {children}) {
    const loggedIn=useSelector(state=>state.auth.loggedIn)  

  return (
    loggedIn? <>{children}</>
    :(<Navigate to="/signin"></Navigate>)
    
  )
}
