import React, {useContext,useEffect,useRef,useState} from 'react'
import {auth} from '../../../firerbaseConfig'
import { createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword} from 'firebase/auth'

type AuthProviderProps = {
    children: React.ReactNode
}
export type User = import("@firebase/auth").User
type AuthContextType = { 
    setUserCurrent: (user: User) => void
    currentUser: User | null
    signup: (email: string, password: string) => Promise<User>
    login: (email: string, password: string) => Promise<User>
    logout: () => Promise<void>
    resetpassword: (email: string) => Promise<void>
    verifyEmail: () => Promise<void>
}

const AuthContext=React.createContext<AuthContextType | null>(null)
const AuthProvider = ({children}:AuthProviderProps) => {
    const [currentUser, setCurrentUser] =useState<User | null>(null)
    const createdUser = useRef({} as User)
    // const currentUser = useRef<User | null>(null)
    useEffect(()=>{
        auth.onAuthStateChanged(user=>{
            // currentUser.current = user
            setCurrentUser(user)
        })
    })
    const setUserCurrent = (user:User)=>{
        setCurrentUser(user)
    }
    //signup context
    const signup = async (email:string, password:string): Promise<User>=>{
        const user = await createUserWithEmailAndPassword(auth,email,password)    
        return user.user
        //or return auth.currentUser <- with null as possible type
    }

    //login context
    const login = async (email:string,password:string)=>{
        const user = await signInWithEmailAndPassword(auth,email,password)
        return user.user
    }

    //logout context
    const logout = async ()=>{
        await auth.signOut()
    }

    //resetpassword context
    const resetpassword = async (email:string)=>{
        await sendPasswordResetEmail(auth,email)
    }

    //verify context
    const verifyEmail = async ()=>{
        await sendEmailVerification(createdUser.current)
    }
  return (
    <React.Fragment>
        <AuthContext.Provider value={{setUserCurrent, currentUser, signup, login, logout, resetpassword, verifyEmail}}>
            {children}
        </AuthContext.Provider>
    </React.Fragment>
  )
}

export const useAuth = ()=>(
    useContext(AuthContext)
)

export default AuthProvider