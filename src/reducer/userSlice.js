import { createSlice } from "@reduxjs/toolkit";

const initialState={
  user:null,
  token:null,
  searchedUsers:[],
  currentPage:"Home"
}
const userData=createSlice({
  name:"userdetail",
  initialState,
  reducers:{
    setData(state,action){
      return{
        ...state,
        user:action.payload.user,
        token:action.payload.token,
      }
    },
    removeData(state,action){
      return{
        ...state,
        user:null,
        token:null,
      }
    },
    setCurrentPage(state,action){
      return{
        ...state,
        currentPage:action.payload
      }
    },
    setSearchedUser(state,action){
      return{
        ...state,
        searchedUsers:[...action.payload]
      }
    }
  }
})


export const {setData,removeData,setCurrentPage,setSearchedUser} = userData.actions
export default userData.reducer