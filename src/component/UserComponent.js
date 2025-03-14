import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
export const UserComponent = ({props}) => {
    const {name,username,following,followers,_id} = props;
    const navigate = useNavigate()
  return (
    <Wrapper onClick={()=>navigate(`/profile/${_id}`)}>
        <p className='name'>{name}</p>
        <p className='username'>{username}</p>
        <div className='follower-container'>
          <p className='following'><span>{following?.length}</span> Following</p>
          <p className='following'><span>{followers?.length}</span> Follower</p>
         </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
width: 80%;
border: 1px solid grey;
border-radius: 10px;
padding: 15px;
@media screen and (max-width:786px) {
    width: 100%;
}
cursor: pointer;
.name{
    font-size:16px ;
    font-weight: 700;
    color: black;
}
.username{
    font-size: 13px;
    font-weight: 400;
    color: grey;
}
.follower-container{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 15px;
    p{
        font-size: 16px;
        font-weight: 500;
        color: grey;
        span{
            font-weight: 700;
            color: black;
        }
    }
}
`;
