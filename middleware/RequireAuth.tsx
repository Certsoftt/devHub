import React from 'react'
import { useAuth } from './AuthProvider'
import {Navigate, useLocation} from 'react-router-dom'
type RequireAuthProp = {
    children: React.ReactNode
}
const RequireAuth = ({children}: RequireAuthProp) => {
    const location = useLocation() 
    const user = useAuth()?.currentUser
    if(!user){
      return <Navigate to="/login" state={{path: location.pathname}} />
    }
  return children
}

export default RequireAuth