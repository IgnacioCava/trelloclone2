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