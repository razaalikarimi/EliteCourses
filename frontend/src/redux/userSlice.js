import { createSlice } from "@reduxjs/toolkit"

const userSlice=createSlice({
    name:"user",
    initialState:{
        userData:null,
        isAuthLoading:true
    },
    reducers:{
        setUserData:(state,action)=>{
        state.userData=action.payload
        state.isAuthLoading=false
        },
        setAuthLoading:(state,action)=>{
        state.isAuthLoading=action.payload
        }
    }
})

export const {setUserData,setAuthLoading}=userSlice.actions
export default userSlice.reducer