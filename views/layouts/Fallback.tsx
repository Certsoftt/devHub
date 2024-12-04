import { Typography,Stack } from '@mui/material'
import React from 'react'
import {IconContext} from 'react-icons'
import {CgSpinner} from 'react-icons/cg'

const Fallback = () => {
  return (
    <React.Fragment>
        <Stack style={{width:"50%",height:"150px",justifyContent:"center", alignItems:"center"}}>
            <Typography variant="h6" style={{textAlign: "center"}}>...Loading</Typography>
            <IconContext.Provider value={{color:"red", size:"5rem"}}>
                <CgSpinner className="spin"/>
            </IconContext.Provider>
        </Stack>   
    </React.Fragment>
  )
}

export default Fallback