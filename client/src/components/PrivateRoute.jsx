import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

export default function PrivateRoute() {
    const {currentUser} = useSelector((state) => state.user)
    // If user is not logged in it will be automatically navigated to the sign in page
  return currentUser ? <Outlet/> : <Navigate to='/sign-in' />
}
