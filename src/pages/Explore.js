import React, { useState } from 'react'
import Layout from '../component/Layout'
import { Leftsidebar } from '../component/Leftsidebar'
import { Rightsidebar } from '../component/Rightsidebar'
import styled from 'styled-components'
import { useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setExploreTweets } from '../reducer/tweetSlice'
import { Loader } from '../component/Loader'
import { Tweet } from '../component/Tweet'


export const Explore = () => {
  const exploreTweets = useSelector((state)=>state?.tweets?.exploreTweet);
  const dispatch = useDispatch();
  const [isLoading,setIsLoading] = useState(false);
  const handleExploreTweet = async() =>{
    setIsLoading(true)
    try {
      const res = await axios.post(`${process.env.apiUrl}/api/tweet/explore`);
      console.log(res)
      dispatch(setExploreTweets(res?.data?.exploreTweets))
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleExploreTweet();
  }, [])
  
  return (
    <Layout>
     <Wrapper>
        <div className='leftside-bar'>
        <Leftsidebar/>
        </div>
        <div className='main-tweet'>
         {
          isLoading
          ?
          <Loader/>
          :
          exploreTweets?.map((val)=>{
            return <Tweet props={val}/>
        })
         }
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
    flex: 2;
    border: 1px solid #EBEEF0;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    overflow-y: auto;
    &::-webkit-scrollbar{
      display: none;
    }
    @media screen and (max-width:786px) {
      margin-bottom: 20px;
    }

}
.rightside-bar{
    flex: 1;
    @media screen and (max-width:786px) {
      display: none;
    }
}
`;