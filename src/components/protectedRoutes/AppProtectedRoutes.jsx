
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authContext } from '../../context/AuthContext'

export default function AppProtectedRoutes({children}) {

  const{token} =useContext(authContext)

  const Navigate = useNavigate()

  useEffect(() => {

if(!token){

  Navigate("/login")



}
  },
[token])
  
  return (
   <>
   {children}
   </>
  )
}
