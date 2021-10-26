export const loginStart = (userCredentials )=>({
    type:"LOGIN_START",

})

export const loginSeccefull = (user)=>({
    type:"LOGIN_SUCCES",
    payload:user
})

export const loginFailure = ()=>({
    type:"LOGIN_FAILURE",
})
export const logOut = ()=>({
    type:"LOGOUT",
})

export const updateStart = (userCredentials )=>({
    type:"UPDATE_START",

})

export const updateSeccefull = (user)=>({
    type:"UPDATE_SUCCES",
    payload:user
})

export const updateFailure = ()=>({
    type:"UPDATE_FAILURE",
})