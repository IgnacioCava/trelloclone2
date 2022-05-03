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
    width: 100%;
`

export const Label = styled.label`
    font-weight: bold;
    color: #333;
    text-align: left;
`

export const Input = styled.input`
    width: ${props => props.length+3+'ch'};
    max-width: 100%;
    border: 1px solid #ccc;
    border-radius: 3px;
    padding: 10px;
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

export const ToolTip = styled.div`
    position: absolute;
    opacity:0;
    top: -130%;
    right: -10px;
    background-color: #555555;
    border-radius: 5px;
    padding: 10px;
    font-size: 12px;
    font-weight: bold;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s;
    z-index: 2;
    pointer-events:none;
    &:after{
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: #555 transparent transparent transparent;
    }

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

export const Text = styled.div`
    display: flex;
    align-items: flex-start;
    position: relative;
    justify-content: flex-start;
    cursor: pointer;
    font-size: 1.2rem;
    font-weight: 100;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    gap:10px;
    color: #000;
    h3{
        font-size: 1.5rem;
        margin:0;
    }
    &:hover{
        ${Icon}{
            transform: scale(1.1);
            box-shadow: 0 0 0 2px #ccc;
        }
        ${ToolTip}{
            opacity:1;
        }
    }
`

export const Editable = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    justify-content: flex-start;
    width: 100%;
    height: fit-content;
    gap:10px;
    padding:10px;
    box-sizing: border-box;
`