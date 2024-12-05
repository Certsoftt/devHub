// import React,{useState, useRef, useEffect} from 'react'
// import { Paper, Card, CardMedia, CardContent, 
// CardActions, Typography, Grid, Button, TextField, 
// Stack, FormControl, InputAdornment, IconButton} from '@mui/material'
// import {Visibility, VisibilityOff} from '@mui/icons-material'
// import {DevTool} from '@hookform/devtools'
// import {useFieldArray, useForm} from 'react-hook-form'
// import logo from '../../../logo.svg'
// import { HandleView, PasswordSwitchType } from '../../types/PasswordSwitch.type'
// import PhoneInput from 'react-phone-input-2'

// type FormValues = {
//     username: string
//     firstname: string
//     lastname: string
//     email: string
//     password:string
//     confirmPassword: string
//     phoneNum: {number:string}[]
// }

// const passwordState: HandleView = {
//     password:{
//         type: "password",
//         visibility:<Visibility/>
//     },
//     viewPassword:{
//         type:"text",
//         visibility: <VisibilityOff/>
//     }
// }

// const UpdateProfile = () => {
//     const [passwordView, setPasswordView]=useState({type:"password",visibility:<Visibility/>} as PasswordSwitchType)
//     const [confirmPasswordView, setConfirmPasswordView]=useState({type:"password",visibility:<Visibility/>} as PasswordSwitchType)
    
//     const form = useForm<FormValues>({
//         defaultValues: async ()=>{
//             //api call
//             return {
//                 username: "",
//                 firstname:"",
//                 lastname:"",
//                 email: "",
//                 password: "",
//                 confirmPassword: "",
//                 phoneNum:[{number:""}]
//             }
//         }
//     })
//     const {register,formState, watch,handleSubmit,control} = form
//     const {errors,isDirty,isValid,isSubmitting} = formState
//     const {fields,append,remove}= useFieldArray({ //fields=[{number:"entered value"}]
//         name: "phoneNum",
//         control
//     })
//     const handlePasswordView = ()=>{
//         if(passwordView.type === "password"){
//             setPasswordView(
//                 passwordState.viewPassword
//             )
//         }else{
//             setPasswordView(
//                 passwordState.password
//             )
//         }
//     }
//     const handleConfirmPasswordView = ()=>{
//         if(confirmPasswordView.type === "password"){
//             setConfirmPasswordView(
//                 passwordState.viewPassword
//             )
//         }else{
//             setConfirmPasswordView(
//                 passwordState.password
//             )
//         }
//     }
//     const onSub = ()=> {}
//     const endpoint = useRef<string | null>(null)
//     useEffect(()=>{
//         endpoint.current = window.location.pathname
//     })
//     return (
//     <React.Fragment>
//         <Stack spacing={2} sx={{justifyContent:"center",alignItems:"center"}}>
//             <Typography variant="h2" sx={{fontSize:"20px",fontWeight:700,paddingTop:"30px"}}>
//                 {endpoint.current==="dashboard/update-profile" && 'UPDATE PROFILE'}
//             </Typography>
//         </Stack>
//         <Paper elevation={4} sx={{width:"80%", height:"auto", textAlign:"center", margin:"auto", marginTop:"30px"}}>
//             <Card component="section">
//                 <CardMedia component="img" image={logo} height="150" alt="react logo" sx={{backgroundColor: "#000000"}}/>
//                 <FormControl component="form" onSubmit={handleSubmit(onSub)} noValidate>
//                     <CardContent>
//                         <Grid container rowSpacing={1} columnSpacing={2}>
//                             <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
//                                 <Stack spacing={2} direction="row" sx={{justifyContent: "center", alignItems: "center",paddingRight:"30px",paddingLeft:"30px"}}>
//                                     <TextField fullWidth size="small" type="text" {...register("username",{
//                                         disabled:true,
//                                         required:{
//                                             value: true,
//                                             message: "is required"
//                                         },
//                                         validate:{
//                                             usernameLength:(fieldValues)=>(
//                                                 fieldValues.length >= 5 || 'Username must be 5 characters or more'
//                                             ),
//                                             notAdmin: (fieldValues)=>(
//                                                 !fieldValues.toLowerCase().includes('admin') || "Username must not contain admin"
//                                             )
//                                         }
//                                     })}
//                                     label="Enter Username" error={!!errors.username} required
//                                     helperText={typeof errors.username?.message !== "undefined"? `${errors.username.message}`:`username:${watch("username")}`}/>
//                                 </Stack>
//                             </Grid>
//                             <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
//                                 <Stack spacing={2} direction="row" sx={{justifyContent: "center", alignItems: "center",paddingRight:"30px",paddingLeft:"30px"}}>
//                                     <TextField fullWidth size="small" type="text" {...register("firstname",{
//                                         disabled:watch("username")==="",
//                                         required:{
//                                             value: true,
//                                             message: "is required"
//                                         },
//                                         validate:{
//                                             notAdmin: (fieldValues)=>(
//                                                 !fieldValues.toLowerCase().includes('admin') || "firstname must not contain admin"
//                                             )
//                                         }
//                                     })}
//                                     label="Enter Firstname" error={!!errors.firstname} required
//                                     helperText={typeof errors.firstname?.message !== "undefined"? `${errors.firstname.message}`:`firstname:${watch("firstname")}`}/>
//                                 </Stack>
//                             </Grid>
//                             <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
//                                 <Stack spacing={2} direction="row" sx={{justifyContent: "center", alignItems: "center",paddingRight:"30px",paddingLeft:"30px"}}>
//                                     <TextField fullWidth size="small" type="text" {...register("lastname",{
//                                         disabled:watch("firstname")==="",
//                                         required:{
//                                             value: true,
//                                             message: "is required"
//                                         },
//                                         validate:{
//                                             notAdmin: (fieldValues)=>(
//                                                 !fieldValues.toLowerCase().includes('admin') || "Lastname must not contain admin"
//                                             )
//                                         }
//                                     })}
//                                     label="Enter Lastname" error={!!errors.lastname} required
//                                     helperText={typeof errors.lastname?.message !== "undefined"? `${errors.lastname.message}`:`lastname:${watch("lastname")}`}/>
//                                 </Stack>
//                             </Grid>
//                             {
//                                 fields.map((field,index)=>(
//                                     <React.Fragment>
//                                         <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
//                                             <Stack spacing={2} direction="row" sx={{justifyContent: "center", alignItems: "center",paddingRight:"30px",paddingLeft:"30px"}}>
//                                                 <PhoneInput key={field.id}
                                                
//                                                 />
//                                             </Stack>
//                                         </Grid>
//                                         {
//                                             index > 0 && (
//                                                 <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
//                                                     <Stack spacing={2} direction="row" sx={{justifyContent: "center", alignItems: "center",paddingRight:"30px",paddingLeft:"30px"}}>
//                                                         <Button variant="outlined" fullWidth size="large" onClick={()=>remove(index)}>Remove</Button>
//                                                     </Stack>
//                                                 </Grid>
//                                             )
//                                         }
//                                     </React.Fragment>
//                                 ))
//                             }

//                             <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
//                                 <Stack spacing={2} direction="row" sx={{justifyContent: "center", alignItems: "center",paddingRight:"30px",paddingLeft:"30px"}}>
//                                     <Button variant="contained" fullWidth size="large" onClick={()=>append({number:""})}>Add Another Number</Button>
//                                 </Stack>
//                             </Grid>                            
//                             <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
//                                 <Stack spacing={2} direction="row" sx={{justifyContent: "center", alignItems: "center",paddingRight:"30px",paddingLeft:"30px"}}>
//                                     <TextField fullWidth size="small" type="email" {...register("email",{
//                                         disabled: true,
//                                         required:{
//                                             value: true,
//                                             message: "is required"
//                                         },
//                                         pattern:{
//                                             value:/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9-]+)*$/,
//                                             message:" invalid email"
//                                         },
//                                         validate:{
//                                             notAdmin: (fieldValue)=>(
//                                                 !fieldValue.toLowerCase().includes('admin') || "Email must not contain admin"
//                                             )
//                                         }
//                                     })}
//                                     label="Enter email" required error={!!errors.email}
//                                     helperText={typeof errors.email?.message !== "undefined"? `${errors.email.message}`:`email:${watch("email")}`}
//                                     />
//                                 </Stack>
//                             </Grid>
//                             <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
//                                 <Stack spacing={2} direction="row" sx={{justifyContent: "center", alignItems: "center",paddingRight:"30px",paddingLeft:"30px"}}>
//                                     <TextField fullWidth size="small" type={passwordView.type} {...register("password",{
//                                         disabled: watch("email") === "",
//                                         required:{
//                                             value: true,
//                                             message: "is required"
//                                         },
//                                         validate:{
//                                             passwordLength: (fieldValue)=>(
//                                                 fieldValue.length >= 8 || 'Password must be 8 characters or more'
//                                             )
//                                         }
//                                     })}
//                                     label="Enter Old Password" required error={!!errors.password}
//                                     helperText={typeof errors.password?.message !== "undefined"?`${errors.password.message}`:``}
//                                     slotProps={{
//                                         input: {
//                                             endAdornment: <InputAdornment position="end" onClick={handlePasswordView}>
//                                                 <IconButton color="primary">
//                                                     {passwordView.visibility}
//                                                 </IconButton>
//                                             </InputAdornment>
//                                         }
//                                     }}
//                                     />
//                                 </Stack>
//                             </Grid>
//                             <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
//                                 <Stack spacing={2} direction="row" sx={{justifyContent: "center", alignItems: "center",paddingRight:"30px",paddingLeft:"30px"}}>
//                                     <TextField fullWidth size="small" type={confirmPasswordView.type} {...register("confirmPassword",{
//                                         disabled: watch("password")==="",
//                                         required:{
//                                             value: true,
//                                             message: "is required"
//                                         },
//                                         validate:{
//                                             similarPassword: (fieldValue)=>(
//                                                 fieldValue === watch("password") || 'Password must be 8 characters or more'
//                                             )
//                                         }
//                                     })}
//                                     label="Enter New Password" required error={!!errors.confirmPassword}
//                                     helperText={typeof errors.confirmPassword?.message !== "undefined"?`${errors.confirmPassword.message}`:``}
//                                     slotProps={{
//                                         input: {
//                                             endAdornment: <InputAdornment position="end" onClick={handleConfirmPasswordView}>
//                                                 <IconButton color="primary">
//                                                     {confirmPasswordView.visibility}
//                                                 </IconButton>
//                                             </InputAdornment>
//                                         }
//                                     }}
//                                     />
//                                 </Stack>
//                             </Grid>
//                         </Grid>
//                     </CardContent>
//                     <CardActions>
//                         <Stack spacing={2} direction="row" sx={{justifyContent: "center", alignItems: "center"}}>
//                             <Button type="submit" variant="contained" size="medium" disabled={!isValid || !isDirty || isSubmitting}>Submit</Button>
//                         </Stack>  
//                     </CardActions>
//                 </FormControl>
//             </Card>
//             <DevTool control={control}/>
//         </Paper>
//     </React.Fragment>
//   )
// }

// export default UpdateProfile