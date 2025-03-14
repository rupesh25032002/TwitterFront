import React from 'react'
import styled from 'styled-components';
import { Rightsidebar } from '../component/Rightsidebar';
import { Leftsidebar } from '../component/Leftsidebar';
import Layout from '../component/Layout';
import { useSelector } from 'react-redux';
import { UserComponent } from '../component/UserComponent';

export const Search = () => {
    const searchedUser = useSelector((state)=>state?.user?.searchedUsers)
    console.log(searchedUser)
  return (
    <Layout>
    <Wrapper>
       <div className='leftside-bar'>
       <Leftsidebar/>
       </div>

       <div className='main-tweet'>
        {
            searchedUser?.map((val)=>{
                return <UserComponent props={val}/>
                 
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
        z-index: 1;
    }
}
.main-tweet{
    flex: 2;
    border: 1px solid #EBEEF0;
    display: flex;
    flex-direction: column;
    padding: 20px;
    position: relative;
    overflow-y: auto;
    gap: 20px;
    @media screen and (max-width:786px){
        margin-bottom: 30px;
    }
}
.rightside-bar{
    flex: 1;
    @media screen and (max-width:786px){
        display: none;
    }
}
`;
