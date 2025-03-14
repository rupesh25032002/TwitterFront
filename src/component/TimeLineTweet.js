import axios from 'axios';
import React, { useEffect,useState } from 'react'
import { Tweet } from './Tweet';
import { useDispatch, useSelector } from 'react-redux'
import { setTimelineTweets } from '../reducer/tweetSlice';
import styled from 'styled-components';
import { Loader } from './Loader';

export const TimeLineTweet = () => {
const timelineTweets = useSelector((state)=>state?.tweets?.timeLineTweet);
const dispatch = useDispatch();
const userData = JSON.parse(localStorage.getItem("userdata"));
const [isLoading,setIsLoading] = useState(false);

const fetchTimeLineTweet = async () =>{
    setIsLoading(true)
    console.log(userData?.token)
    try {
        const res = await axios.post(`/api/tweet/timeline/${userData?.user?._id}`,
        {},
        {
            headers: {
              Authorization: `${userData?.token}` // Assuming token is stored in currentUser
            },
          })
          console.log(res)
        dispatch(setTimelineTweets(res?.data?.allTweet?.flat()))
        setIsLoading(false)
    } catch (error) {
       console.log(error) 
    }
}
useEffect(()=>{
 fetchTimeLineTweet();
},[])

  return (
    <>
    {
        isLoading?
        <Loader/>
        :
        timelineTweets.length > 0 
        ?
        <Wrapper>
            {
                timelineTweets?.map((val)=>{
                    return <Tweet props={val} fetchTimeLineTweet={fetchTimeLineTweet}/>
                })
            }
        </Wrapper>
            :
        <Notweets>
            <p>No tweets are available...</p>
        </Notweets>
        }
    
    </>
  )
}

const Wrapper = styled.div`
display: flex;
flex-direction: column;
gap: 20px;
padding: 20px 0;
`;

const Notweets = styled.div`
display: flex;
justify-content: center;
p{
    font-size: 20px;
    font-weight: 700;
}
`;
