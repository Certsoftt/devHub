import React from 'react'
import { Typography } from '@mui/material'
import { ComponentPropsType } from '../../../../middleware/helpers/ControllerTmplateView'


const UserDashboard = ({userDataFromAuth:uDA, userDataFromDB:uDB}:ComponentPropsType) => {
  console.log(uDA)
  return(
    <React.Fragment>
      {uDA?.email}
      <Typography>
        <span>Welcome: </span>{uDB?.username}
      </Typography>
    </React.Fragment>
  )
}

export default UserDashboard