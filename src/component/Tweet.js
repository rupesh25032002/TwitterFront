import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import moment from "moment";
import axios from "axios";
import TweetReply from "./TweetReply";
import TweetReplyBox from "./TweetReplyBox";
import { MdDelete } from "react-icons/md";
import DeletePopup from "./DeletePopup";

export const Tweet = ({ props, fetchTimeLineTweet }) => {
  const { createdAt, description, likes, replies, userId, _id } = props; //_id is Tweet id and userId is user id
  const [userDetail, setUserDetail] = useState();
  const [tweetLikes, setTweetLikes] = useState([...likes]);
  const [isLiked, setIsLiked] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [tweetReplyContainerValue, settweetReplyContainerValue] =
    useState(false);
  const [deletePopup,setDeletePopup] = useState(false);
  const currentUserId = JSON.parse(localStorage.getItem("userdata"))?.user?._id;

  //get User Detail
  const getUserDetail = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_APIURL}/api/user/getuser/${userId}`);
      setUserDetail(res?.data?.user);
    } catch (error) {
      console.log(error);
    }
  };

  //handle Like Dislike
  const handleLikeDisLike = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_APIURL}/api/tweet/${_id}/like`, {
        userId: `${currentUserId}`,
      });
      setTweetLikes([...res?.data?.tweet?.likes]);
    } catch (error) {
      console.log(error);
    }
  };

  //handle Close button of Tweet Reply
  const handleCloseBtnTweetReply = (value) => {
    settweetReplyContainerValue(value);
  };

  //handle Close button of Tweet Reply
  const handleCloseBtn = (value) => {
    // settweetReplyContainerValue(value);
    setDeletePopup(value)
  };

  useEffect(() => {
    getUserDetail();
    tweetLikes?.includes(currentUserId) ? setIsLiked(true) : setIsLiked(false);
  }, []);

  useEffect(() => {
    tweetLikes?.includes(currentUserId) ? setIsLiked(true) : setIsLiked(false);
  }, [tweetLikes]);

  return (
    <>
      <Wrapper>
        <Link className="userDetail" to={`/profile/${userId}`}>
          <p className="username">{userDetail?.name}</p>
          <p className="userid">@{userDetail?.username}</p>
          <p className="duration">- {moment(createdAt).fromNow()}</p>
          {currentUserId === userId && <MdDelete className="delete-tweet" onClick={(e)=>{
            e.preventDefault();
            setDeletePopup(true)
          }}/>}
        </Link>
        <div className="tweet-description">
          <p className="desc">{description}</p>
        </div>
        <div className="likes-container">
          {isLiked ? (
            <FaHeart
              className="dark-heart"
              onClick={() => handleLikeDisLike()}
            />
          ) : (
            <FaRegHeart
              className="light-heart"
              onClick={() => handleLikeDisLike()}
            />
          )}
          <p className="like-count">{tweetLikes?.length}</p>
          <div
            className="replyTweet"
            onClick={() =>
              settweetReplyContainerValue(!tweetReplyContainerValue)
            }
          >
            Reply
          </div>
          {replies.length > 0 && (
            <p
              className="view-replies"
              onClick={() => setShowReplies(!showReplies)}
            >
              {showReplies
                ? "Hide Replies"
                : `View ${
                    replies.length > 1
                      ? `${replies.length - 1}+ Replies`
                      : `${replies.length} Reply`
                  } `}
            </p>
          )}
        </div>
        {showReplies && (
          <div className="repliedTweets">
            {replies?.map((reply) => {
              return (
                <TweetReplyBox
                  userId={reply.id}
                  reply={reply}
                  userDetail={userDetail}
                />
              );
            })}
          </div>
        )}
        {deletePopup && <DeletePopup handleCloseBtn={handleCloseBtn} _id={_id} userId={userId} fetchTimeLineTweet={fetchTimeLineTweet}/>}
      </Wrapper>
      {tweetReplyContainerValue && (
        <TweetReply
          handleCloseBtnTweetReply={handleCloseBtnTweetReply}
          userId={_id}
          replies={replies}
          fetchTimeLineTweet={fetchTimeLineTweet}
        />
      )}
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  border-bottom: 1px solid grey;
  padding-bottom: 10px;

  &:last-child {
    border-bottom: unset;
  }
  .userDetail {
    display: flex;
    column-gap: 10px;
    text-decoration: none;
    align-items: center;
    .username {
      font-size: 18px;
      font-weight: 700;
      color: grey;
    }
    .userid {
      font-size: 17px;
      font-weight: 500;
      color: black;
    }
    .duration {
      font-size: 14px;
      font-weight: 400;
      color: black;
    }
    .delete-tweet {
    }
  }
  .tweet-description {
    p {
      font-size: 16px;
      font-size: 400;
      color: black;
    }
  }
  .likes-container {
    display: flex;
    gap: 5px;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
    .dark-heart {
      color: red;
      cursor: pointer;
    }
    .replyTweet {
      padding-left: 15px;
      color: #1da1f2;
      font-weight: bold;
    }
  }
  .repliedTweets {
    width: 75%;
    margin-left: auto;
  }
  .view-replies {
    padding-left: 15px;
    color: #1da1f2;
    font-weight: bold;
  }
`;
