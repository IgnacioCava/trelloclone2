import styled from "styled-components";

export const NewBoardWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: #fafafa8f;
    position: absolute;
    top:0;
    z-index: 100;
    overflow: hidden;
    `

export const Box = styled.form`
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 30vmax;
    height: fit-content;
    padding:20px;
    box-sizing: content-box;
    background-color: white;
    position: relative;
`

export const CloseContainer = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
`
