import React,{useState,useEffect,useRef} from 'react'
import { Paper, Card, CardMedia, CardContent, 
CardActions, Typography, Grid, Button, TextField, 
Stack, FormControl, InputAdornment, IconButton} from '@mui/material'
import {Visibility, VisibilityOff, Google, PhoneAndroid} from '@mui/icons-material'
import {DevTool} from '@hookform/devtools'
import {useForm} from 'react-hook-form'
import logo from '../../../../logo.svg'
import { useAuth } from '../../middleware/AuthProvider'
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom'

type PasswordSwitchType = {
    type: string
    visibility: React.ReactNode
}
type HandleView = {
    password:PasswordSwitchType
    viewPassword:PasswordSwitchType
}
type FormValues = {
    email: string
    password:string
}

const passwordState: HandleView = {
    password:{
        type: "password",
        visibility:<Visibility/>
    },
    viewPassword:{
        type:"text",
        visibility: <VisibilityOff/>
    }
}

const LoginForm = () => {
    const navigate = useNavigate()
    const user = useAuth()
    const [passwordView, setPasswordView]=useState({type:"password",visibility:<Visibility/>} as PasswordSwitchType)
    const form = useForm<FormValues>({
        defaultValues: async ()=>{
            //api call
            return {
                email: "",
                password: "",
            }
        }
    })
    const {register,formState, watch,handleSubmit,control} = form
    const {errors,isSubmitting,isValid, isDirty} = formState
    const handlePasswordView = ()=>{
        if(passwordView.type === "password"){
            setPasswordView(
                passwordState.viewPassword
            )
        }else{
            setPasswordView(
                passwordState.password
            )
        }
    }
    const onSub = (data:FormValues)=> {
        user?.login(data.email, data.password)
        .then(user=>{
            toast.success('Login Successfully', {position:"top-center"})
            navigate(`/dashboard/${user.uid}`,{replace:true})
        })
        .catch(error=>{
            toast.error(error.message, {position:"top-right"})
        })
    }
    const endpoint = useRef<string | null>(null)
    useEffect(()=>{
        endpoint.current = window.location.pathname
    })
    
  return (
    <React.Fragment>
        <Stack spacing={2} sx={{justifyContent:"center",alignItems:"center"}}>
            <Typography variant="h2" sx={{fontSize:"20px",fontWeight:700,paddingTop:"30px"}}>
                {endpoint.current==="/login" && 'LOGIN BELOW'}
            </Typography>
        </Stack>
        <Paper elevation={4} sx={{width:"90%", height:"auto", textAlign:"center", margin:"auto", marginTop:"30px"}}>
            <Card id="section">
                <CardMedia component="img" image={logo} height="150" alt="react logo" sx={{backgroundColor: "#000000"}}/>
                <FormControl component="form" onSubmit={handleSubmit(onSub)} noValidate>
                    <CardContent>
                        <Grid container rowSpacing={1} columnSpacing={1}>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <Stack spacing={2} direction="row" sx={{justifyContent: "center", alignItems: "center",paddingRight:"10px",paddingLeft:"10px",paddingTop:"30px"}}>
                                    <TextField size="small" type="email" {...register("email",{
                                        required:{
                                            value: true,
                                            message: "Email is required"
                                        },
                                        pattern:{
                                            value:/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9-]+)*$/,
                                            message:" invalid email"
                                        }
                                    })}
                                    label="Enter email" required error={!!errors.email} fullWidth
                                    helperText={typeof errors.email?.message !== "undefined"? `${errors.email.message}`:`email:${watch("email")}`}
                                    />
                                </Stack>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <Stack spacing={2} direction="row" sx={{justifyContent: "center", alignItems: "center",paddingRight:"10px",paddingLeft:"10px"}}>
                                    <TextField size="small" fullWidth type={passwordView.type} {...register("password",{
                                        disabled: watch("email") === "",
                                        required:{
                                            value: true,
                                            message: "is required"
                                        },
                                        validate:{
                                            passwordLength: (fieldValue)=>(
                                                fieldValue.length >= 8 || 'Password must be 8 characters or more'
                                            )
                                        }
                                    })}
                                    label="Enter Password" required error={!!errors.password}
                                    helperText={typeof errors.password?.message !== "undefined"?`${errors.password.message}`:``}
                                    slotProps={{
                                        input: {
                                            endAdornment: <InputAdornment position="end" onClick={handlePasswordView}>
                                                <IconButton color="primary">
                                                    {passwordView.visibility}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    }}
                                    />
                                </Stack>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions>
                        <Grid container rowSpacing={1} columnSpacing={1}>
                            <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                                <Stack spacing={2} direction="row" sx={{justifyContent: "center", alignItems: "center"}}>
                                    <Button type="submit" variant="contained" size="medium" color="inherit" disabled={!isDirty|| !isValid || isSubmitting} fullWidth>Login</Button>
                                </Stack>
                            </Grid>
                            <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                                <Stack spacing={2} direction="row" sx={{justifyContent: "center", alignItems: "center"}}>
                                    <Button href="google-signin" variant="contained" size="medium" color="warning" startIcon={<Google/>} fullWidth></Button>
                                </Stack>
                            </Grid>
                            <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                                <Stack spacing={2} direction="row" sx={{justifyContent: "center", alignItems: "center"}}>
                                    <Button href="phone-signin" variant="contained" size="medium" color="info" startIcon={<PhoneAndroid/>} fullWidth>OTP</Button>
                                </Stack>
                            </Grid>
                        </Grid>
                          
                    </CardActions>
                </FormControl>
            </Card>
            <DevTool control={control}/>
        </Paper>
    </React.Fragment>
  )
}

export default LoginForm