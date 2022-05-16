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
    max-width: 100%;
    align-items: flex-start;
`

export const Input = styled.input`
    width: ${props => props.length+2+'ch'};
    max-width: 100%;
    border: 1px solid #ccc;
    border-radius: 3px;
    padding: 5px;
    box-sizing: border-box;
    background-color: #f5f5f5;
    caret-color: grey;
    outline: none;
    transition: .3s;
    :focus{
        border: 1px solid #2189ff;
        background-color: white;
        transition: 0s;
    }
`

export const Wrap = styled.div`
    display: flex;
    gap: 5px;
    width:90%;
`

export const Icon = styled.img`
    cursor: pointer;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 20%;
    border: 1px solid #ccc;
    background-color: #fff;
    box-shadow: 0 0 0 1px #ccc;
    transition: all 0.3s;
    &:hover{
        transform: scale(1.1);
        box-shadow: 0 0 0 2px #ccc;
    }
`

export const Label = styled.label`
    font-weight: bold;
    color: #333;
    text-align: left;
`

export const Text = styled.div`
    display: flex;
    align-items: flex-start;
    position: relative;
    justify-content: flex-start;
    cursor: pointer;
    font-size: 1.2rem;
    font-weight: 100;
    padding: 5px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    gap:10px;
    color: #000;
    border-radius: 3px;
    border: 1px solid transparent;
    transition: .2s;
    h3{
        font-size: 1.5rem;
        margin:0;
    }
    &:hover{
        background-color: #ffffff;
        border: 1px solid grey;
    }
`

export const Editable = styled.div`
    display: flex;
    align-items: flex-start;
    position: relative;
    justify-content: flex-start;
    width: 100%;
    height: fit-content;
    gap:10px;
    box-sizing: border-box;
`