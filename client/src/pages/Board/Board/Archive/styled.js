import styled from "styled-components";

export const Restore = styled.button`
    background: #2a73e2;
`

export const Delete = styled.button`
    background: #ff4242;
`

export const Title = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size: 1.2rem;
    font-weight: bold;
    align-items: baseline;
`


export const From = styled.span`
    font-size: 0.8rem;
    color: #5c5c5c;
    font-weight: 500;
    height: fit-content;
`

export const Options = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    button{
        border: none;
        outline: none;
        cursor: pointer;
        border-radius: 5px;
        padding: 5px;
        font-weight: 600;
        color: #ffffff;
        transition: 0.15s;
        :hover{
            filter: brightness(1.15);
        }
    }
`

export const Elements = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    color: black;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 0 10px;
    box-sizing: border-box;
    border-radius: 5px;
    justify-content: flex-start;
    gap: 10px;
    margin-bottom:10px;
    ::-webkit-scrollbar {
        width: 10px;
        background: transparent;
    }
    ::-webkit-scrollbar-thumb {
        background: #2a74e26b;
        border-radius: 5px;
    }

`

export const Element = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    min-width: fit-content;
    justify-content: space-evenly;
    min-height: 100px;
    background-color: #ededed;
    border-radius: 3px;
    border: 1px solid #b1b1b1;
    white-space: nowrap;
`

export const Content = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    transition: all 0.3s ease-in-out;
    width: ${props=>props.open?'100%':'0'};
    overflow: hidden;
    height: 100%;
    overflow-y: auto;
    gap: 10px;
    padding-top: 5px;
    box-sizing: border-box;
    >div{
        white-space: nowrap;
    }
`

export const ArchiveWrapper = styled.div`
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease-in-out;
    width: ${props=>props.open?'40%':'0'};
    height: 100%;
    z-index: 0;
    background-color: #0000007d;
    color:white;
    position: relative;
`

export const Widget = styled.div`
    display: flex;
    justify-content: center;
    width: 40px;
    height: 40px;
    background-color: #2a73e2;
    border-radius: 50% 0 0 50%;
    position: absolute;
    left:-40px;
    top:10px;
    z-index: 1;
    color:white;
    font-size: 30px;
    cursor: pointer;
    line-height: 34px;
    user-select: none;
    transition: 0.15s;
    span{
        display: flex;
        justify-content: center;
        transition: all 0.3s ease-in-out;
        transform: ${props=>props.open?'rotate(0deg)':'rotate(180deg)'};
    }
    &:hover{
            filter: brightness(1.15);
    }
`

export const Error = styled.div`
display: flex;
align-items: center;
justify-content: space-around;
font-size: 1.2rem;
font-weight: bold;
color: white;
align-items: baseline;
`
    