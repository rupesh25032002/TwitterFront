import React, { useEffect, useState } from "react";
import Layout from "../component/Layout";
import { Leftsidebar } from "../component/Leftsidebar";
import { Rightsidebar } from "../component/Rightsidebar";
import styled from "styled-components";
import { CiCalendar } from "react-icons/ci";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { useSelector } from "react-redux";
import { Tweet } from "../component/Tweet";

export const Profile = () => {

  const userId = useParams();
  const [currentUserDetail, setCurrentUserDetail] = useState({});
  const userDetail = useSelector((state) => state?.user?.user);
  const [isFollow, setIsFollow] = useState(false);
  const [updateDetail, setUpdateDetail] = useState({
    name: currentUserDetail?.name,
    username: currentUserDetail?.username,
    description: currentUserDetail?.description,
  });
  const [isDialog, setIsDialog] = useState(false);
  const [userTweets, setUserTweets] = useState([]);
  const mainUserId = useSelector((state) => state?.user?.user?._id);

  //get user Detail
  const getCurrentUserData = async () => {
    try {
      const res = await axios.get(`${process.env.apiUrl}/api/user/getuser/${userId?.id}`);
      setCurrentUserDetail(res?.data?.user);
    } catch (error) {
      console.log(error);
    }
  };

  //get user tweets
  const getUserTweets = async () => {
    try {
      const res = await axios.post(`${process.env.apiUrl}/api/tweet/user/all/${userId?.id}`);
      console.log(res);
      setUserTweets([...res?.data?.userTweets]);
    } catch (error) {
      console.log(error);
    }
  };

  //handle follow and unfollow
  const handleFollow = async () => {
    try {
      if (!isFollow) {
        const res = await axios.post(
          `${process.env.apiUrl}/api/user/follow/${currentUserDetail?._id}`,
          {
            userId: `${userDetail?._id}`,
          }
        );
        setIsFollow(true);
      } else {
        const res = await axios.post(
          `${process.env.apiUrl}/api/user/unfollow/${currentUserDetail?._id}`,
          {
            userId: `${userDetail?._id}`,
          }
        );
        currentUserDetail?.followers?.includes(userDetail?._id)
          ? setIsFollow(true)
          : setIsFollow(false);
        setIsFollow(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //handle Edit Profile
  const handleEditProfile = () => {
    setIsDialog(!isDialog);
  };

  //handle update profile
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${process.env.apiUrl}/api/user/update/${currentUserDetail?._id}`,
        {
          ...updateDetail,
        }
      );
      getCurrentUserData();
      setIsDialog(!isDialog);
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    getCurrentUserData();
    getUserTweets();
    currentUserDetail?.followers?.includes(userDetail?._id)
      ? setIsFollow(true)
      : setIsFollow(false);
    setUpdateDetail({
      ...updateDetail,
      name: currentUserDetail?.name,
      username: currentUserDetail?.username,
      description: currentUserDetail?.description,
    });
  }, [userId]);

  useEffect(() => {
    currentUserDetail?.followers?.includes(userDetail?._id)
      ? setIsFollow(true)
      : setIsFollow(false);
    setUpdateDetail({
      ...updateDetail,
      name: currentUserDetail?.name,
      username: currentUserDetail?.username,
      description: currentUserDetail?.description,
    });
  }, [currentUserDetail]);

  return (
    <Layout>
      <Wrapper>
        <div className="leftside-bar">
          <Leftsidebar />
        </div>

        <div className="main-tweet">
          <div className="profile-container">
            <div className="profile-detail">
              <p className="name">{currentUserDetail?.name}</p>
              <div className="buttons-list">
                {userId?.id === mainUserId ? (
                  <button
                    className="edit-profile"
                    onClick={() => handleEditProfile()}
                  >
                    Edit Profile
                  </button>
                ) : null}
                <button className="follow-btn" onClick={() => handleFollow()}>
                  {isFollow ? "UnFollow" : "Follow"}
                </button>
              </div>
            </div>
            <p className="username">{currentUserDetail?.username}</p>
            <p className="description">{currentUserDetail?.description}</p>
            <div className="user-extra">
              <CiCalendar className="calendar-logo" />
              <p className="joined-date">
                Joined - {moment(currentUserDetail?.createdAt).fromNow()}
              </p>
            </div>
            <div className="follower-container">
              <p className="following">
                <span>{currentUserDetail?.following?.length}</span> Following
              </p>
              <p className="following">
                <span>{currentUserDetail?.followers?.length}</span> Follower
              </p>
            </div>
          </div>
          <div className="usertweets">
            {userTweets?.map((val) => {
              return <Tweet props={val} fetchTimeLineTweet={getUserTweets}/>;
            })}
          </div>
          {isDialog ? (
            <div className="editprofile-container">
              <form onSubmit={(e) => handleUpdateProfile(e)}>
                <p>UPDATE PROFILE</p>
                <input
                  type="text"
                  value={updateDetail.name}
                  onChange={(e) =>
                    setUpdateDetail({ ...updateDetail, name: e.target.value })
                  }
                  placeholder="Name"
                />
                <input
                  type="text"
                  value={updateDetail.username}
                  onChange={(e) =>
                    setUpdateDetail({
                      ...updateDetail,
                      username: e.target.value,
                    })
                  }
                  placeholder="username"
                />
                <input
                  type="text"
                  value={updateDetail.description}
                  onChange={(e) =>
                    setUpdateDetail({
                      ...updateDetail,
                      description: e.target.value,
                    })
                  }
                  placeholder="description"
                />
                <input type="submit" value="Update" className="submit-btn" />
                <input
                  type="btn"
                  value="Close"
                  className="close-btn"
                  onClick={() => setIsDialog(!isDialog)}
                />
              </form>
            </div>
          ) : null}
        </div>
        <div className="rightside-bar">
          <Rightsidebar />
        </div>
      </Wrapper>
    </Layout>
  );
};

const Wrapper = styled.div`
  max-width: 1225px;
  margin: auto;
  display: flex;
  gap: 20px;
  height: 90vh;
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
  .main-tweet {
    flex: 2;
    border: 1px solid #ebeef0;
    display: flex;
    flex-direction: column;
    padding: 20px;
    /* position: relative; */
    overflow-y: auto;
    @media screen and (max-width:786px){
        margin-bottom: 30px;
    }
    &::-webkit-scrollbar {
      display: none;
    }
    .profile-container {
      display: flex;
      flex-direction: column;
      width: 100%;
      .profile-detail {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 3px;
        .name {
          font-size: 18px;
          font-weight: 700;
          color: black;
        }
        .buttons-list {
          display: flex;
          flex-direction: row;
          gap: 10px;
          .edit-profile,
          .follow-btn {
            padding: 11px 13px;
            font-size: 16px;
            border: 3px solid #1da1f2;
            border-radius: 15px;
            background-color: transparent;
            color: #1da1f2;
          }
        }
      }
      .username,
      .description {
        font-size: 16px;
        font-weight: 500;
        color: #665e5e;
        padding-bottom: 8px;
      }
      .description {
        font-weight: 400;
      }
      .user-extra {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 5px;
        padding-bottom: 10px;
        .calendar-logo,
        .joined-date {
          font-size: 20px;
          color: #665e5e;
        }
        .joined-date {
          font-size: 16px;
        }
      }
      .follower-container {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 10px;
        .following {
          color: #665e5e;
          font-size: 16px;
          font-weight: 400;
          span {
            font-weight: 700;
            color: black;
          }
        }
      }
    }

    .editprofile-container {
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
      /* height: 50%; */
      width: 80%;
      background-color: white;
      left: 50%;
      form {
        /* height: 100%; */
        width: 100%;
        padding: 20px;
        display: flex;
        flex-direction: column;
        border: 2px solid black;
        box-shadow: 3px 3px 20px black;
        p {
          text-align: center;
          width: 100%;
          font-size: 20px;
          font-weight: bold;
          padding: 20px 0;
        }
        input {
          border: 1px solid blue;
          border-radius: 10px;
          width: 100%;
          font-size: 14px;
          margin-bottom: 15px;
          outline: none;
          padding: 10px;
        }
        .submit-btn {
          background-color: #1da1f2;
          color: white;
          margin-bottom: 10px;
          text-align: center;
        }
        .close-btn {
          background-color: red;
          color: white;
          text-align: center;
          border: none;
          cursor: pointer;
        }
      }
    }
    .usertweets {
      padding-top: 40px;
    }
  }
  .rightside-bar {
    flex: 1;
    @media screen and (max-width:786px){
        display: none;
    }
  }
`;
