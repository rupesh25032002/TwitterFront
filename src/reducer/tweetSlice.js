import { createSlice } from "@reduxjs/toolkit";

const initialState={
  timeLineTweet:[],
  exploreTweet:[]
}
const Tweets=createSlice({
  name:"Tweets",
  initialState,
  reducers:{
    setTimelineTweets(state,action){
      return{
        ...state,
        timeLineTweet:[...action.payload]
      }
    },
    setExploreTweets(state,action){
      return{
        ...state,
        exploreTweet:[...action.payload]
      }
    }
  }
})



export const {setTimelineTweets,setExploreTweets} = Tweets.actions
export default Tweets.reducer