export const loginStart = (userCredential)=>({
  type:"LOGIN_START",


});
export const loginSuccess = (user)=>({
    type:"LOGIN_SUCCESS",
    payload: user
})

export const loginFailure = ()=>({
    type:"LOGIN_FAILURE",

})

export const logOut =()=>({
    type:"LOGOUT"
})
export const updateStart = (userCredential)=>({
    type:"UPDATE_START",
  
  
  });
  export const updateSuccess = (user)=>({
      type:"UPDATE_SUCCESS",    
      payload: user
  })
  
  export const updateFailure = ()=>({
      type:"UPDATE_FAILURE",
  
  })