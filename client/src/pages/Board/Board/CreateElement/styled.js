import styled from "styled-components"

export const ElementInput = styled.input`
    width: 100%;
    height: 40px;
    border: 2px solid #0079bf;
    border-radius: 3px;
    padding: 8px 12px;
    box-sizing: border-box;
    outline: none;
`

export const Exit = styled.img`
    outline: none;
    padding: 7px;
    object-fit: cover;
    box-sizing: border-box;
    cursor:pointer;
    transition: all 0.2s;
    :hover{
        background-color: #00000029;
    }
`

export const Options = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 30px;
    gap:5px;
    *{
        font-size: 14px;
        font-weight: normal;
        height: 100%;
        margin:0;
        border-radius: 3px;
    }
`

export const CreateElementWrapper = styled.div`
    display: flex;
    min-width: 272px;
    width: 100%;
    max-width: 100%;
    background-color: ${props => props.add ? '#ebecf0':'#dbdbdb' };
    padding: 4px;
    box-sizing: border-box;
    font-size:14px;
    border-radius:3px;
    :hover{
        background-color: ${props => props.add ? '#ebecf0':'white' };
    }
`

export const PlusIcon = styled.img`
    width:20px;
    height:20px;
    padding:3px;
    box-sizing:border-box;
    cursor:pointer;
`

export const NewElementText = styled.span`
    font-size:14px;
`

export const Clickable = styled.div`
    display: flex;
    padding:6px;
    width:100%;
    text-align: start;
    cursor:pointer;
`

export const ElementForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    height: 100%;
    border-radius: 3px;
    gap:4px;
`

export const ElementArea = styled.textarea`
    width: 100%;
    height: fit-content;
    border: 2px solid #0079bf;
    border-radius: 3px;
    padding: 8px 12px;
    box-sizing: border-box;
    outline: none;
    resize: none;
    font-size: 14px;
    font-weight: normal;
    font-family: 'Arial', sans-serif;
`

export const Text = styled.span`
    word-break: break-word;
    width: 100%;
`