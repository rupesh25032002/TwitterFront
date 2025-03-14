import React from 'react'
import { FaHome } from "react-icons/fa";
import { FaHashtag } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { useDispatch, useSelector } from 'react-redux'
import { CiLogout } from "react-icons/ci";

import styled from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';
import { setCurrentPage } from '../reducer/userSlice';

export const Leftsidebar = () => {
const userDeatil = useSelector((state)=>state?.user?.user);
const dispatch = useDispatch();
const handleCurrentPage = (current) =>{
dispatch(setCurrentPage(current))
 }
const navigate = useNavigate()
 const handleLogOut = () =>{
    localStorage.removeItem("userdata");
    navigate("/register")
 }
  return (
    <Wrapper>
        <NavLink className='tabs' to="/" onClick={()=>handleCurrentPage("Home")}>
            <div className='tabs-logo'><FaHome /></div>
            <p className='tabs-title'>Home</p>
        </NavLink>
        <NavLink className='tabs' to="/explore" onClick={()=>handleCurrentPage("Explore")}>
            <div className='tabs-logo'><FaHashtag /></div>
            <p className='tabs-title'>Explore</p>
        </NavLink>
        <NavLink className='tabs' to={`/profile/${userDeatil?._id}`} onClick={()=>handleCurrentPage("Profile")}>
            <div className='tabs-logo'><CgProfile /></div>
            <p className='tabs-title'>Profile</p>
        </NavLink>
        <div className='tabs'  onClick={()=>handleLogOut()}>
            <div className='tabs-logo'><CiLogout /></div>
            <p className='tabs-title'>Logout</p>
        </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
@media screen and (max-width:768px) {
    display:flex;
}
.tabs{
    display: flex;
    gap: 15px;
    padding: 15px 10px;
    text-decoration:none;
    @media screen and (max-width:768px) {
        padding: 10px;
        justify-content: center;
        align-items: center;
        gap: 7px;
}
    cursor: pointer;
    .tabs-logo{
        width: 30px;
        height: 30px;
        @media screen and (max-width:768px) {
            width: 20px;
            height: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        svg{
            height: 100%;
            width: 100%;
            color: black;
        }
    }
    .tabs-title{
        font-size: 19px;
        font-weight: 700;
        color: black;
        @media screen and (max-width:768px){
            font-size: 16px;
        }
    }
}
.active{
    .tabs-logo{
        svg{
            color: #1DA1F2;
        }
    }
    .tabs-title{
        color: #1DA1F2;
    }
}
`;
