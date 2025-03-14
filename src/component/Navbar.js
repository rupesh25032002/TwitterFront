import React, { useState } from 'react'
import styled from 'styled-components'
import { FaSearch } from "react-icons/fa";
import { useSelector,useDispatch } from 'react-redux';
import axios from 'axios';
import { setSearchedUser,setCurrentPage } from '../reducer/userSlice';
import { useNavigate } from 'react-router-dom';
export const Navbar = () => {
const currentPage = useSelector((state)=>state?.user?.currentPage);
const [searchedData,setSearchedData] = useState("");
const dispatch = useDispatch();
const navigate = useNavigate();
const handleSearch = async() =>{
  try {
    const res = await axios.post(`/api/user/getalluser`,{
        searchedData
    })
    console.log(res)
    dispatch(setSearchedUser([...res?.data?.allUser]))
    dispatch(setCurrentPage("Search"))
    navigate("/search")
  } catch (error) {
console.log(error)
  }
}
  return (
    <Wrapper>
        <div className='logo-container'>
            <img src="/images/twetterlogo.png" alt="Tweeter Logo"/> 
        </div>
        <div className='section-container'>
            <p className='current-section'>{currentPage}</p>
            <img src="/images/stars.png"  alt=""/>
        </div>
        <div className='search-container'>
            <div className='input-container'>
                <div className='search-icon'><FaSearch onClick={()=>handleSearch()}/></div>
                <input type='text' placeholder='Search something...' value={searchedData} onChange={(e)=>setSearchedData(e.target.value)} />
            </div>
        </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
font-family: 'Poppins', sans-serif;
max-width: 1225px;
margin: auto;
display: flex;
gap: 20px;
@media screen and (max-width:786px) {
    align-items: center;
    padding: 10px;
    gap: unset;
}
.logo-container{
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 10px;
    @media screen and (max-width:786px) {
        flex: unset;
    }
    img{
        height: 30px;
        width: 30px;
        @media screen and (max-width:786px) {
            height: 20px;
            width: 20px;
        }
}
}
.section-container{
    flex: 2;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media screen and (max-width:786px) {
        font-size: 15px;
    }

    .current-section{
        font-size: 19px;
        font-weight: 700;
        padding: 0 15px;
    }
    .img{
        width: 24px;
        height: 24px;
    }
}
.search-container{
    flex: 1;
    padding-top:10px;
    .input-container{
        display: flex;
        background-color: #EBEEF0;
        border: 1px solid #EBEEF0;
        gap: 5px;
        border-radius: 10px;
        padding: 10px;
        .search-icon{
            width: 19px;
            height: 19px;
        }
        input{
            background-color: #EBEEF0;
            font-size: 16px;
            font-weight: 400;
            flex: 1;
            border: none;
            outline: none;
            @media screen and (max-width:786px) {
                font-size: 13px;
            }
        }

    }
}


`
