import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const app = initializeApp({
    apiKey: REACT_APP_API_KEY,
    authDomain: REACT_APP_AUTH_DOMAIN,
    projectId: REACT_APP_PROJECT_ID,
    storageBucket: REACT_APP_STORAGE_BUCKET,
    messagingSenderId: REACT_APP_MESSAGING_SENDER_ID,
    appId: REACT_APP_APP_ID,
    measurementId: REACT_APP_MEASUREMENT_ID,
    //REALTIME DATABSE(firebase/database) NOT FIRESTORE(firebase/firestore)
    databaseURL: REACT_APP_DATABASE_URL
})

export const auth = getAuth(app)
export const db = getFirestore(app)

export default app
