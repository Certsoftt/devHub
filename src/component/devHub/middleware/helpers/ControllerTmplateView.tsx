import React, {useRef} from 'react'
import { useAuth, User } from '../AuthProvider'
import {doc, getDoc} from 'firebase/firestore'
import { db } from '../../../../firerbaseConfig'

export type DocumentData = import('@firebase/firestore').DocumentData

export type ComponentPropsType = {
  userDataFromAuth?: User | undefined
  userDataFromDB?: DocumentData | undefined
}

type ControllerTemplateProp = {
    // dbQueryResult: {}[],
    component:React.ComponentType<ComponentPropsType>

}

const ControllerTmplateView = ({component:Component}:ControllerTemplateProp) => {
  const globalUserAuth = useRef<undefined | User>(undefined)
  const globalUserDB = useRef<undefined | DocumentData>(undefined)
  GetUser().then(user=>{
    globalUserAuth.current = user?.UserAuth
    globalUserDB.current = user?.UserDB
  })
  return (
    <Component userDataFromAuth={globalUserAuth.current} userDataFromDB={globalUserDB.current}/>
  )
}

const GetUser = async ()=>{
  let UserAuth: User | undefined
  let UserDB: DocumentData | undefined
  const user = useAuth()
  if(user && user.currentUser){
    const newDOCRef = doc(db, 'users',user.currentUser.uid)
    const snapshots = await getDoc(newDOCRef)
    if(snapshots.exists()){
      UserAuth = user.currentUser
      UserDB = snapshots.data()
      return{UserAuth, UserDB}
    }
  }

}
const SetData = ()=>{}

export default ControllerTmplateView