import styled from 'styled-components';

export const Buttons = styled.div`
    button{
        background-color: inherit;
        color: white;
        padding: 14px;
        margin: 8px 0;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 16px;
        font-weight: bold;
        transition: .4s;
    }
`

export const LogOut = styled.button`
    &:hover {
        background-color: white;
        color: #2268ff;
    }
`

export const NavBar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    height: 60px;
    background-color: #2268ff;
    color: white;
    font-size: 20px;
    font-weight: bold;
    z-index: 1;
`