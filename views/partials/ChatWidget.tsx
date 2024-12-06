import React from 'react'
import {SpeedDial, SpeedDialAction, SpeedDialIcon} from "@mui/material"
import { ChatBubble, Mail, Message, Phone, WhatsApp } from '@mui/icons-material'

const ChatWidget = () => {
    const handleWhatsApp = ()=>{
        window.location.href="https://wa.me/+2348148106698"
    }
    const handleMail = ()=>{
        window.location.href="mailto:makemorelive@gmail.com"
    }
    const handleCall = ()=>{
        window.location.href="tel:+2348135217281"
    }
  return (
    <React.Fragment>
        <SpeedDial ariaLabel="chat widgets" sx={{position:"absolute", bottom:16,right:16}} icon={<SpeedDialIcon openIcon={<ChatBubble/>}/>}>
            <SpeedDialAction icon={<WhatsApp/>} tooltipTitle="Chat on WhatsApp" tooltipOpen onClick={handleWhatsApp}/>
            <SpeedDialAction icon={<Mail/>} tooltipTitle="send mail" tooltipOpen onClick={handleMail}/>
            <SpeedDialAction icon={<Phone/>} tooltipTitle="Place a Call" tooltipOpen onClick={handleCall}/>
        </SpeedDial>
    </React.Fragment>
  )
}

export default ChatWidget
