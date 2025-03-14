import axios from "axios";
import React from "react";
import { RxCross2 } from "react-icons/rx";
import styled from "styled-components";

const DeletePopup = ({ handleCloseBtn, _id, fetchTimeLineTweet, userId }) => {

  //handle tweet delete
  const handleTweetDelete = async () => {
    console.log("clcik");
    try {
      await axios.delete(`/api/tweet/delete/${_id}`, {
        data: {
          userId,
        },
      });
      fetchTimeLineTweet();
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <Wrapper>
      <div className="deletepopup-container">
        <p className="warning-msg">You will lost your tweet permanently!</p>
        <button className="deleteBtn" onClick={handleTweetDelete}>
          Delete
        </button>
        <RxCross2
          className="closeTweetReplyContainer"
          onClick={() => handleCloseBtn(false)}
        />
      </div>
    </Wrapper>
  );
};

export default DeletePopup;

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  position: absolute;
  padding: 0 15px;
  left: 0;
  top: 0;
  overflow: hidden;
  .deletepopup-container {
    position: absolute;
    padding: 20px;
    max-width: 1200px;
    border-radius: 10px;
    border: 1px solid rgb(216, 202, 202);
    width: 50%;
    bottom: 10px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    flex: 1;
    column-gap: 10px;
    background: grey;
    display: flex;
    column-gap: 14px;
    justify-content: center;
    align-items: center;
    width: 30%;
    height: 150px;
    max-height: 150px;
    background: #1da1f2;
  }
  .closeTweetReplyContainer {
    position: absolute;
    font-size: 25px;
    color: white;
    right: 20px;
    top: 20px;
    cursor: pointer;
  }
  .deleteBtn {
    background: red;
    border: red;
    border-radius: 5px;
    padding: 5px 10px;
  }
  .warning-msg {
    color: white;
  }
`;
