import styled from 'styled-components';

export const Error = styled.span`
    color: #ff5858;
    font-size: 12px;
    font-weight: bold;
    display: block;
    text-align: left;
`

export const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
`

export const Label = styled.label`
    font-weight: bold;
    color: #333;
    text-align: left;
`

export const Input = styled.input`
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 3px;
    padding: 10px;
    box-sizing: border-box;
    background-color: #f5f5f5;
    caret-color: grey;
    outline: none;
    transition: .2s;
    :focus{
        border: 1px solid #2189ff;
        background-color: white;
    }
`