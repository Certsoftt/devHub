import React,{useState,useEffect,useRef} from 'react'
import { Paper, Card, CardMedia, CardContent, 
CardActions, Typography, Grid, Button, 
Stack, FormControl,Divider} from '@mui/material'
import { CgSpinner } from 'react-icons/cg'
import {BsTelephoneFill} from 'react-icons/bs'
import {IoMdArrowBack} from 'react-icons/io'
import {PhoneAndroid} from '@mui/icons-material'
import{ useCountUp } from 'react-countup'
// import IdleTimer from 'react-idle-timer'
import logo from '../../../../logo.svg'
import { useAuth} from '../../middleware/AuthProvider'
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import OtpInput from 'otp-input-react'
import { RecaptchaVerifier, signInWithPhoneNumber} from 'firebase/auth'
import { auth } from '../../../../firerbaseConfig'
import ChatWidget from '../partials/ChatWidget'

// type ConfirmationResult = import("@firebase/auth").ConfirmationResult
type UserCredential = import("@firebase/auth").UserCredential

const PhoneForm = () => {
    const {start, update, reset, pauseResume} = useCountUp({duration:300, end:5, startOnMount: false, ref:"timer", suffix:" Minutes", prefix:"Expires In: "})
    const navigate = useNavigate()
    const userCurrent = useAuth()
    const [phoneValue, setPhoneValue] = useState<string | null>('')
    const [loading, setLoading] = useState(false)
    const [nextScreen, setNextScreen] = useState(false)
    const [otp, setOtp] = useState<string | null>('')
    // const IdleTimerRef = useRef(null)
    const endpoint = useRef<string | null>(null)
    useEffect(()=>{
        endpoint.current = window.location.pathname;
    })
    const sendOTP = async ()=>{
        onCaptchVerify()
        const appVerifier = window.recaptchaVerifier;
        const formatph = "+" + phoneValue!
        signInWithPhoneNumber(auth, formatph, appVerifier)
        .then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            setNextScreen(true)
            start()
            update(0)
          }).catch((error) => {
            toast.error(error.message,{position:"top-right"})
          })

    }
    const onCaptchVerify=()=>{
        if(!window.recaptchaVerifier){
            window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
                'size': 'invisible',
                'callback': (response:any) => {
                  sendOTP()
                },
                'expired-callback': () => {
                  // Response expired. Ask user to solve reCAPTCHA again.
                  // ...
                }
              })
        }
    }
    const verifyOTP = async ()=>{
        setLoading(true)
        window.confirmationResult.confirm(otp)
        .then(async (data:UserCredential)=>{
            userCurrent?.setUserCurrent(data.user)
            toast.success("Successfully Logge In", {position: "top-center"})
            setLoading(false)
            navigate(`/dashboard/${data.user.uid}`, {replace:true})
        })
        .catch(error=>{
            toast.error(error.message, {position: "top-center"})
            setLoading(false)
        })
    }
    const PreviewScreen = ()=>{
        setNextScreen(false)
        reset()
        pauseResume()
    }
  return (
    <React.Fragment>
        <ChatWidget/>
        <Paper component="main" elevation={4} sx={{width:"50%", height:"auto", textAlign:"center", margin:"auto", marginTop:"30px",paddingTop:"30px",backgroundColor:"#61dafb"}}>
            <Stack spacing={4} direction="column" 
            divider={<Divider orientation="horizontal" flexItem/>} 
            sx={{justifyContent:"center",alignItems:"center",backgroundColor:"#000000",paddingTop:"30px"}}>
                <Typography variant="h1" sx={{fontSize:"20px",fontWeight:500,color:"white"}}>Welcome To Makemore</Typography>
                <Card id="card">
                    <CardContent>
                        <Stack spacing={2} sx={{justifyContent:"center",alignItems:"center"}}>
                            <Typography variant="h2" sx={{fontSize:"20px",fontWeight:700,paddingTop:"30px"}}>
                                {endpoint.current==="/otp" && 'OTP LOGIN'}
                            </Typography>
                        </Stack>
                        <Paper elevation={4} sx={{width:"90%", height:"auto", textAlign:"center", margin:"auto", marginTop:"30px"}}>
                            <Card id="section">
                                <CardMedia component="img" image={logo} height="150" alt="react logo" sx={{backgroundColor: "#000000"}}/>
                                <FormControl component="form">
                                    <CardContent>
                                        <Grid container rowSpacing={1} columnSpacing={1}>
                                            {nextScreen || (
                                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                                <Stack spacing={2} direction="column" sx={{justifyContent: "center", alignItems: "center",paddingRight:"10px",paddingLeft:"10px",paddingTop:"30px"}}>
                                                    <PhoneInput country={'us'} value={phoneValue} onChange={setPhoneValue}/>
                                                    <Typography component="div" id="recaptcha-container"></Typography>
                                                </Stack>
                                            </Grid>
                                            )}
                                            {nextScreen && (
                                            <React.Fragment>
                                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                                    <Stack spacing={2} direction="row" sx={{justifyContent: "center", alignItems: "center",paddingRight:"10px",paddingLeft:"10px"}}>
                                                        {/* <IdleTimer ref={IdleTimerRef}></IdleTimer> */}
                                                        <Typography component="div" variant="h1" fontSize={3} id="timer"/>
                                                    </Stack>
                                                </Grid>
                                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                                    <Stack spacing={2} direction="row" sx={{justifyContent: "center", alignItems: "center",paddingRight:"10px",paddingLeft:"10px"}}>
                                                        <BsTelephoneFill size={30} color="white"/>
                                                    </Stack>
                                                </Grid>
                                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                                    <Stack spacing={2} direction="row" sx={{justifyContent: "center", alignItems: "center",paddingRight:"10px",paddingLeft:"10px"}}>
                                                        <OtpInput OTPLength={6} otpType="number" disabled={false} autoFocus value={otp} onChange={setOtp}></OtpInput>
                                                    </Stack>
                                                </Grid>
                                            </React.Fragment>
                                            )}
                                        </Grid>
                                    </CardContent>
                                    <CardActions>
                                        <Grid container rowSpacing={1} columnSpacing={1}>
                                            {nextScreen || (
                                                <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                                    <Stack spacing={2} direction="row" sx={{justifyContent: "center", alignItems: "center"}}>
                                                        <Button type="button" variant="outlined" size="medium" color="inherit"fullWidth onClick={sendOTP}>Send OTP</Button>
                                                    </Stack>
                                                </Grid>
                                                )
                                            }
                                            {nextScreen && (
                                                <React.Fragment>
                                                    <Grid item xs={5} sm={5} md={5} lg={5} xl={5}>
                                                        <Stack spacing={2} direction="row" sx={{justifyContent: "center", alignItems: "center"}}>
                                                            <Button variant="outlined" size="medium" color="inherit" type="button"
                                                            startIcon={<IoMdArrowBack/>} fullWidth
                                                            onClick={PreviewScreen}>Back</Button>
                                                        </Stack>
                                                    </Grid>
                                                    
                                                    <Grid item xs={5} sm={5} md={5} lg={5} xl={5}>
                                                        <Stack spacing={2} direction="row" sx={{justifyContent: "center", alignItems: "center"}}>
                                                            <Button variant="contained" size="medium" color="primary" type="button"
                                                            startIcon={loading?<CgSpinner className="spin" size={20} color="white"/>:<PhoneAndroid/>} fullWidth
                                                            onClick={verifyOTP} disabled={loading}>Verify</Button>
                                                        </Stack>
                                                    </Grid>
                                                </React.Fragment>
                                                )
                                            }
                                        </Grid>     
                                    </CardActions>
                                </FormControl>
                            </Card>
                        </Paper>
                    </CardContent>
                </Card>
            </Stack>   
        </Paper>
    </React.Fragment>
  )
}

export default PhoneForm
