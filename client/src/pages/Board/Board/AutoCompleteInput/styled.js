import styled from "styled-components"

export const UserData = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`

export const Email = styled.span`
    font-size: 0.8rem;
    color: #777777;
    margin-left: 0.5rem;
`

export const Search = styled.div`
    width: fit-content;
    position: relative;
`

export const User = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    background-color: white;
    width: 100%;
    padding: 5px;
    box-sizing: border-box;
    border-radius: 3px;
    gap: 10px;
    cursor: pointer;
`

export const Found = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: fit-content;
    align-items: flex-start;
    width: 100%;
    box-sizing: border-box;
    position: absolute;
    background-color: #eeeeee;
    overflow: auto;
    padding: 5px;
    gap: 10px;
    z-index: 1;
    border: 1px solid #cccccc;
    border-radius: 5px;
`

export const Input = styled.input`
    width: 100%;
    border: 1px solid #ccc;
    outline: none;
    transition: all 0.3s;
    padding: 5px;
    box-sizing: border-box;
    border-radius: 5px;
    overflow: hidden;
    :focus {
        border: 1px solid #2189ff;
    }
`