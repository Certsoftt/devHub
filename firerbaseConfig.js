import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const app = initializeApp({
    apiKey: "AIzaSyB0yA3k-OU-lcr3aYQ0u1vgtDZaZuFTedA",
    authDomain: "makemoreapp-development.firebaseapp.com",
    projectId: "makemoreapp-development",
    storageBucket: "makemoreapp-development.firebasestorage.app",
    messagingSenderId: "833425836573",
    appId: "833425836573:web:51f7c3eebf30b1ac0854f4",
    measurementId: "G-P5ZCSFSWLJ",
    //REALTIME DATABSE(firebase/database) NOT FIRESTORE(firebase/firestore)
    databaseURL: "https://makemoreapp-development-default-rtdb.firebaseio.com/"
})

export const auth = getAuth(app)
export const db = getFirestore(app)

export default app