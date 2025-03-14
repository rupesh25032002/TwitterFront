import React from 'react'
import styled from 'styled-components'

export const Rightsidebar = () => {
  return (
    <Wrapper>
        <div className='trending-container'>
            <h2>Trending</h2>
            <p>#cricket</p>
            <p>#politics</p>
            <p>#youtuber</p>
            <p>#fooods</p>
            <p>#tour</p>
        </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
padding: 15px 10px;
.trending-container{
    background-color: #EBEEF0;
    padding: 10px;
    border-radius: 10px;
    h2{
    font-size: 20px;
    font-weight: 700;
    padding-bottom: 10px;
    color: black;
}
p{
    color: #5B7083;
    font-size: 16px;
    font-weight: 500;
    padding-bottom: 5px;
}
}
`;
