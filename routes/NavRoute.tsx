import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AuthPage from '../views/partials/AuthPage'
import RequireAuth from '../middleware/RequireAuth'
import UserDashboard from '../views/template/user/dashboards/UserDashboard'
// import ForgotEmail from '../views/forms/ForgotEmail'
// import UpdateProfile from '../views/forms/UpdateProfileForm'
import ControllerTmplateView from '../middleware/helpers/ControllerTmplateView'
import NoAuth from '../middleware/NoAuth'
import Fallback from '../views/layouts/Fallback'

const LoginForm = React.lazy(()=>import('../views/forms/LoginForm'))
const SignUpForm = React.lazy(()=>import('../views/forms/SignUpForm'))

const NavRoute = () => {
  return (
    <React.Fragment>
        <Routes>
            <Route path="/" element={<AuthPage/>}>
                <Route index element={<React.Suspense fallback={<Fallback/>}><LoginForm/></React.Suspense>}/>
                <Route path="/login" element={<React.Suspense fallback={<Fallback/>}><NoAuth><LoginForm/></NoAuth></React.Suspense>}/>
                <Route path="/signup" element={<React.Suspense fallback={<Fallback/>}><NoAuth><SignUpForm/></NoAuth></React.Suspense>}/>
            </Route>
            <Route path="/dashboard/:userId" element={<React.Suspense fallback={<Fallback/>}><RequireAuth><ControllerTmplateView component={UserDashboard}/></RequireAuth></React.Suspense>}/>
            {/* <Route path="/dashboard/update-profile/:userId" element={<React.Suspense fallback={<BounceLoader size={72} color="red" loading="true"/>}><RequireAuth><UpdateProfile/></RequireAuth></React.Suspense>}/> */}
            {/* <Route path="/forgot" element={<React.Suspense fallback={<BounceLoader size={72} color="red" loading="true"/>}><ForgotEmail/></React.Suspense>}/> */}
            {/* <Route path="/google-signin" element={<React.Suspense fallback={<BounceLoader size={72} color="red" loading="true"/>}><ForgotEmail/></React.Suspense>}/> */}
            {/* <Route path="/phone-signin" element={<React.Suspense fallback={<BounceLoader size={72} color="red" loading="true"/>}><ForgotEmail/></React.Suspense>}/> */}
        </Routes>
    </React.Fragment>
  )
}

export default NavRoute