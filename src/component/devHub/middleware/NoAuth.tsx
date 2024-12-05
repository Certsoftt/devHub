import React from 'react'
import { useAuth } from './AuthProvider'
import {Navigate} from 'react-router-dom'
type NoAuthProp = {
    children: React.ReactNode
}
const NoAuth = ({children}: NoAuthProp) => { 
    const user = useAuth()?.currentUser
    if(user){
      return <Navigate to={`/dashboard/${user.uid}`}/>
    }
  return children
}

export default NoAuth