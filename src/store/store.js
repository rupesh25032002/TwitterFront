import { configureStore } from "@reduxjs/toolkit";
import userData from "../reducer/userSlice"
import Tweets from "../reducer/tweetSlice"
const store=configureStore({
  reducer:{
    user:userData,
    tweets:Tweets,
  }
})

export default store