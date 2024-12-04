// import React,{useState, useRef, useEffect} from 'react'
// import { Paper, Card, CardMedia, CardContent, 
// CardActions, Typography, Grid, Button, TextField, 
// Stack, FormControl, InputAdornment, IconButton} from '@mui/material'
// import {Visibility, VisibilityOff} from '@mui/icons-material'
// import {DevTool} from '@hookform/devtools'
// import {useForm} from 'react-hook-form'
// import logo from '../../../logo.svg'

// type PasswordSwitchType = {
//     type: string
//     visibility: React.ReactNode
// }
// type HandleView = {
//     password:PasswordSwitchType
//     viewPassword:PasswordSwitchType
// }
// type FormValues = {
//     email: string
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

// const ForgotEmail = () => {
//     const form = useForm<FormValues>({
//         defaultValues: async ()=>{
//             //api call
//             return {
//                 email: ""
//             }
//         }
//     })
//     const {register,formState, watch,handleSubmit,control} = form
//     const {errors,isDirty,isValid,isSubmitting} = formState
    
//     const onSub = ()=> {}
//     const endpoint = useRef<string | null>(null)
//     useEffect(()=>{
//         endpoint.current = window.location.pathname
//     })
//     return (
//     <React.Fragment>
//         <Stack spacing={2} sx={{justifyContent:"center",alignItems:"center"}}>
//             <Typography variant="h2" sx={{fontSize:"20px",fontWeight:700,paddingTop:"30px"}}>
//                 {endpoint.current==="/forgot" && 'Enter Register Email Below'}
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
//                                     <TextField fullWidth size="small" type="email" {...register("email",{
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

// export default ForgotEmail