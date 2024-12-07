import React, {useState, useEffect} from 'react'
import { Typography } from '@mui/material'
import { DocumentData, useAuth, User } from '../../../../middleware/AuthProvider'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../../../../../firerbaseConfig'
import ChatWidget from '../../../partials/ChatWidget'


const UserDashboard = () => {
  const [userAuth, setUserAuth] = useState({} as User)
  const [userDB, setUserDB]  = useState({} as DocumentData)
  const user = useAuth();
  useEffect(()=>{
    (async ()=>{
      if(user && user.currentUser){
        const newDOCRef = doc(db, 'users',user.currentUser.uid)
        const snapshots = await getDoc(newDOCRef)
        if(snapshots.exists()){
          setUserAuth(user.currentUser)
          setUserDB(snapshots.data())
        }
      }
    })()
    return ()=>{}
  })
  return(
    <React.Fragment>
      {(userAuth && userDB)? (
        <React.Fragment>
          <ChatWidget/>
          <Typography variant="h2">
            Welcome: {userDB.username}
          </Typography>
          <Typography>
            Email: {userAuth.email}
          </Typography>
        </React.Fragment>
      ):(
        <React.Fragment>
          <ChatWidget/>
          <Typography>Loading....</Typography>
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

export default UserDashboard
