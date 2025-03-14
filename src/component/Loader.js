import React from 'react'
import styled, { keyframes } from 'styled-components'
export const Loader = () => {
  return (
    <Wrapper className='loader'>
        <div className='loading'></div>
    </Wrapper>
  )
}

const rotateAnimation = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

const Wrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;

.loading{
    height: 100px;
    width: 100px;
    border-radius: 50%;
    border: 15px solid lightgray ̥;
    border-top: 15px solid #3498db; /* Blue */
    background-color: transparent;
    transform: rotate(0deg);
    animation: ${rotateAnimation} .8s ease infinite;
    box-shadow: 2px 2px 5px black;
}
`
