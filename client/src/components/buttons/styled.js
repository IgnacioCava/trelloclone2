import styled from 'styled-components';

export const AuthAction = styled.div`
    width: 80%;
    height: 3rem;
    border: none;
    border-radius: 5px;
    padding:0px;
    box-sizing: border-box;
    background-color: #2a73e2;
    color: white;
    font: bold 1.2rem 'Roboto', sans-serif;
    *{cursor: pointer;}
    transition: all 0.2s ease-in-out;
    overflow: hidden;
    margin:5px;
    a, button{
        display: flex;
        width: 100%;
        height: 100%;
        text-decoration: none;
        color: inherit;
        align-items: center;
        justify-content: center;
    }
    button{
        background-color: inherit;
        border:none;
        font: inherit;
    }
    &:hover{
        background-color: #3a89ff;
    }
`

export const CloseButton = styled.img`
    width: 30px !important;
    height: 30px !important;
    border-radius: 4px !important;
    box-sizing: border-box;
    padding: 7px;
    object-fit: cover;
    font-weight: bold;
    font-size: 20px;
    transition: .2s;
    background-color: transparent !important;
    cursor: pointer;
    :hover{
        background-color: #00000029 !important;
    }
`

const Text = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 18px;
    font-weight: 600;
    color: #828282;
    height: fit-content;
    text-align: center;
    width: 40%;
    background-color: #fafafa;
    padding: 20px;
    border-radius: 5px;
    gap:20px;
    div{
        display: flex;
        height: 100%;
        justify-content: space-around;
        align-items: center;
    }
    button{
        border: none;
        height: 30px;
        width: 30%;
        border-radius: 5px;
        font-weight: 600;
        text-align: center;
        cursor: pointer;
        &:hover{
            filter: brightness(1.15);
        }
    }

`

export const Safe = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
`

export const Archive = styled.button`
    background-color: #2a73e2;
    color:white;
`

export const Delete = styled.button`
    background-color: #ff5a5f;
    color:white;
`

export const Extendable = styled.div`
    position: relative;
    display: flex;
    width: fit-content !important;
    overflow: unset !important;
    *{
        overflow: unset;
        text-decoration: none !important;
    }
`

export const Overcast = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    width : fit-content !important;
    min-width: fit-content !important;
    top: 0;
    align-items: center;
    left: -10px;
    background-color: white;
    border: 1px solid #e6e6e6;
    border-radius: 5px;
    padding: 5px;
    gap:5px;
    z-index: 5;
    >button{
        padding: 5px;
        border: none;
        border-radius: 5px;
        width: 100% !important;
        cursor: pointer;
        text-align: center;
        &:hover{
            filter: brightness(1.15);
        }
    }
`

export const Ellipsis = styled.img`
    width: 15px !important;
    max-width: 15px !important;
    height: fit-content;
    cursor: pointer;
    padding: 10px;
    transition: all 0.3s;
    border-radius: 5px;
    &:hover {
        transform: scale(1.1);
        background-color: #f5f5f5;
    }
`