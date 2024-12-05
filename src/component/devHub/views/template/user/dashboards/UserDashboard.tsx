import React, {useRef, useEffect} from 'react'
import { Typography } from '@mui/material'
import { DocumentData, useAuth, User } from '../../../../middleware/AuthProvider'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../../../../../firerbaseConfig'


const UserDashboard = () => {
  const UserAuth = useRef<User | undefined>(undefined)
  const UserDB = useRef<DocumentData | undefined>(undefined)
  const user = useAuth();
  useEffect(()=>{
    const subscription = async ()=>{
      if(user && user.currentUser){
        const newDOCRef = doc(db, 'users',user.currentUser.uid)
        const snapshots = await getDoc(newDOCRef)
        if(snapshots.exists()){
          UserAuth.current = user.currentUser
          UserDB.current = snapshots.data()
        }
      }
    }
    return ()=>{
      subscription.unsubscribe()
    }
  })
  return(
    <React.Fragment>
      {UserAuth.current && UserAuth.current.email}
      <Typography>
        <span>Welcome: </span>{UserDB.current?.username}
      </Typography>
    </React.Fragment>
  )
}

export default UserDashboard
