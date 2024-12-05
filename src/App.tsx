import React from 'react';
import './Form.css'
import {Box} from '@mui/material'
// import Routerz from './component/livebroadcast/Routerz';
// import Theme from './component/MaterilaUI/Dynamic Fields/Theme';
// import Fallback from './component/MaterilaUI/Dynamic Fields/Fallback';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import NavRoute from './component/devHub/routes/NavRoute';
import AuthProvider from './component/devHub/middleware/AuthProvider';

// const LazyChatty = React.lazy(()=>import('./component/chatapp/livechat/Chatty'))

function App() {
  return (
    <Box>
      {/* chat app start */}
      {/* <React.Suspense fallback={<Fallback />}>
        <Theme>
          <LazyChatty/>
        </Theme>
      </React.Suspense>
      <ToastContainer/> */}
      {/* chat app ends */}

      {/* livebroadcast app start */}
      {/* <Routerz/> */}
      {/* livebroadcast app ends */}
      <AuthProvider>
        <NavRoute/>
      </AuthProvider>
      <ToastContainer/>
    </Box>
  );
}

export default App;
