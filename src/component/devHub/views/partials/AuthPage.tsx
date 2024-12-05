import React from 'react'
import {Link, Outlet} from 'react-router-dom'
import {Paper, Stack,
Divider, Typography,Card, CardContent,
Grid, Button} from '@mui/material'

const AuthPage = () => {
  return (
    <Paper component="main" elevation={4} sx={{width:"50%", height:"auto", textAlign:"center", margin:"auto", marginTop:"30px",paddingTop:"30px",backgroundColor:"#61dafb"}}>
        <Stack spacing={4} direction="column" 
        divider={<Divider orientation="horizontal" flexItem/>} 
        sx={{justifyContent:"center",alignItems:"center",backgroundColor:"#000000",paddingTop:"30px"}}>
            <Typography variant="h1" sx={{fontSize:"20px",fontWeight:500,color:"white"}}>Welcome To Makemore</Typography>
            <Card id="card">
                <CardContent>
                    <Grid container rowSpacing={1} columnSpacing={2}>
                        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                            <Stack spacing={2} sx={{justifyContent:"center",alignItems:"center"}} direction="row">
                                <Button variant="contained" size="large" id="btn_login" fullWidth>
                                    <Link to="login">Login</Link>
                                </Button>
                            </Stack>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                            <Stack spacing={2} sx={{justifyContent:"center",alignItems:"center"}} direction="row">
                                <Button variant="outlined" size="large" fullWidth>
                                    <Link to="signup">Sign Up</Link>
                                </Button>
                            </Stack>
                        </Grid>
                    </Grid>
                    <Outlet/>
                </CardContent>
            </Card>
        </Stack>
        
    </Paper>
  )
}

export default AuthPage