import axios from 'axios';
import moment from 'moment'
import { useEffect, useState } from 'react';
    import { Link } from 'react-router-dom'
import styled from 'styled-components'

const TweetReplyBox = ({userId,reply}) => {
    const [userDetail, setUserDetail] = useState([]);

    //get User Detail
    const getUserDetail = async () => {
      try {
        const res = await axios.get(`${process.env.apiUrl}/api/user/getuser/${userId}`);
        setUserDetail(res?.data?.user);
      } catch (error) {
        console.log(error);
      }
    };
    useEffect(()=>{
        getUserDetail()
    },[])
  return (
    <Wrapper>
       <Link className="userDetail extra" to={`/profile/${userId}`}>
                <p className="userid">@{userDetail?.username}</p>
                <p className="duration">- {moment(reply?.createdAt).fromNow()}</p>
        </Link>
        <p className='userReply'>{reply.reply}</p>
    </Wrapper>
  )
}

export default TweetReplyBox

const Wrapper = styled.div`
padding-bottom: 10px;
.userDetail.extra{
    .userid{
        font-size: 13px;
        color: #1da1f2 ;
    }
    .duration{
        font-size: 13px;
    }
}
.userReply{
    font-size: 13px;
}
`;
