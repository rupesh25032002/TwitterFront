import React, { memo, useEffect, useState } from "react";
import styled from "styled-components";
import { IoSend } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
const TweetReply = ({
  handleCloseBtnTweetReply,
  userId,
  replies,
  fetchTimeLineTweet,
}) => {
  const [tweetReplyContent, setTweetReplyContent] = useState("");
  const [tweetReply, setTweetReply] = useState([...replies]);

  //handle Tweet Reply
  const handleTweetReply = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_APIURL}/api/tweet/${userId}/replyTweet`, {
        userId: `${JSON.parse(localStorage.getItem("userdata"))?.user?._id}`,
        tweetReplyContent: tweetReplyContent,
      });
      const updatedTweet = res?.data?.tweet?.replies;
      setTweetReply(updatedTweet); // Correctly setting state as an array
      setTweetReplyContent(""); // Clear input after successful reply
      if (res?.data?.success) {
        handleCloseBtnTweetReply(false);
      }
      fetchTimeLineTweet();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(tweetReply);
  }, []);

  return (
    <Wrapper>
      <div className="retweet-container">
        <input
          className="reply-input"
          placeholder="Write reply of tweet"
          onChange={(e) => setTweetReplyContent(e.target.value)}
          value={tweetReplyContent}
        />
        <IoSend className="sendIcon" onClick={handleTweetReply} />
      </div>
      <RxCross2
        className="closeTweetReplyContainer"
        onClick={() => handleCloseBtnTweetReply(false)}
      />
    </Wrapper>
  );
};

export default TweetReply;

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  padding: 0 15px;
  left: 0;
  top: 0;
  overflow: hidden;
  .retweet-container {
    position: absolute;
    padding: 20px;
    max-width: 1200px;
    border-radius: 10px;
    border: 1px solid rgb(216, 202, 202);
    width: 50%;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    flex: 1;
    column-gap: 10px;
    background: transparent;
    display: flex;
    column-gap: 14px;
    justify-content: center;
    align-items: center;

    .reply-input {
      border: 0;
      font-size: 14px;
      flex: 1;
      column-gap: 10px;
      background: transparent;
      border: unset;
      outline: 0;
      color: white;

      &::placeholder {
        color: #1da1f2;
      }
    }
    .sendIcon {
      font-size: 16px;
      color: #1da1f2;
      cursor: pointer;
    }
  }
  .closeTweetReplyContainer {
    position: absolute;
    font-size: 25px;
    color: white;
    right: 20px;
    top: 20px;
    cursor: pointer;
  }
`;
