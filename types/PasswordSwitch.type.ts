export type PasswordSwitchType = {
    type: string
    visibility: React.ReactNode
}

export type HandleView = {
    password:PasswordSwitchType
    viewPassword:PasswordSwitchType
}
export type FormValues = {
    username: string
    email: string
    password:string
    confirmPassword: string
}