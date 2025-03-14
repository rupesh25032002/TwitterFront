import React, { useEffect, useState } from 'react'
import Layout from '../component/Layout'
import { Leftsidebar } from '../component/Leftsidebar'
import { Rightsidebar } from '../component/Rightsidebar'
import styled from 'styled-components'
import { TimeLineTweet } from '../component/TimeLineTweet'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'
import { setTimelineTweets } from '../reducer/tweetSlice'
import { Loader } from '../component/Loader'
export const Home = () => {
    const userDetail = useSelector((state)=>state?.user?.user);
    const timelineTweets = useSelector((state)=>state?.tweets?.timeLineTweet);
    const [tweetContent,setTweetContent] = useState("");
    const dispatch = useDispatch();
    //Create tweet
    const submitTweet = async (e) =>{
        e.preventDefault(); 
        try {
            const res = await axios.post(`${process.env.apiUrl}/api/tweet/`,{
                userId:`${userDetail?._id}`,
                description:`${tweetContent}`
            })
            dispatch(setTimelineTweets([...timelineTweets,res?.data?.savedTweet]));
            setTweetContent("")
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <Layout>
     <Wrapper>
        <div className='leftside-bar'>
        <Leftsidebar/>
        </div>
        <div className='main-tweet'>
         <div className='tweet-container'> 
            <p>{userDetail?.username}</p>
            <form onSubmit={(e)=>submitTweet(e)}>
                <textarea placeholder='Write Something here...' value={tweetContent} onChange={(e)=>setTweetContent(e.target.value)}/>
                <input type='submit' value="Tweet" />
            </form>
         </div>
         <TimeLineTweet/>
        </div>
        <div className='rightside-bar'>
        <Rightsidebar/>
        </div>
     </Wrapper>
    </Layout>
  )
}


const Wrapper = styled.div`
max-width: 1225px;
margin: auto;
display: flex;
gap: 20px;
height:90vh;
.leftside-bar{
    flex: 1;
    @media screen and (max-width:768px) {
        flex: unset;
        position: fixed;
        bottom: 0px;
        background: #f0f0f0;
        width: 100%;
    }
}
.main-tweet{
    padding: 20px;
    flex: 2;
    border: 1px solid #EBEEF0;
    overflow-y: auto;
    &::-webkit-scrollbar{
      display: none;
    }
    .tweet-container{
        p{
            font-size: 20px;
            font-weight: 700;
            color: black;
            padding-bottom: 10px;
        }
        form{
            textarea{
                min-height: 150px;
                background-color: #EBEEF0;
                margin-bottom: 10px;
                font-size: 20px;
                font-weight: 400;
                border: none;
                padding: 10px 15px;
                outline: none;
                width: 100%;
                border-radius: 10px;
            }
            input{
                font-size: 20px;
                color: white;
                background-color: #1DA1F2;
                padding: 9px 15px;
                border: none;
                outline: none;
                border-radius: 15px;
            }
        }
    }
}
.rightside-bar{
    flex: 1;

    @media screen and (max-width:768px) {
        display: none;
    }
}
`;