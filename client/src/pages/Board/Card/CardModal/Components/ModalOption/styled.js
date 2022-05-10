import styled from "styled-components"

export const Buttons = styled.div`
    display: flex;
    gap:10px;
    div{
        display:flex;
        font-size:14px;
        margin: 0;
        width: 50%;
        border-radius: 3px;
    }
`

export const Color = styled.div`
    background-color: ${props => props.color};
    width: 25px;
    height: 25px;
    border-radius: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
`


export const Colors = styled.span`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    gap:5px;
    justify-content: flex-start;
`

export const Info = styled.div`
    display: flex;
    padding: 0 12px;
    align-items: center;
    gap: 15px;
    width: 100%;
`

export const Title = styled.div`
    display: flex;
    align-items: center;
    line-height: 1;
    width: 100%;
    gap:10px;
    justify-content: space-between;
    img{
        height: unset !important;
    }
`

export const CheckIcon = styled.div`
    display: flex;
    justify-content: flex-start;
    width: 100%;
    align-items: center;
    gap:15px;
    input{
        height: 20px;
        width: 20px;
    }
`

export const Option = styled.div`
    display: flex;
    flex-direction: row;
    height: fit-content;
    line-height: 32px;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    font-size: 14px;
    color: rgb(23, 43, 77);
    background-color: #091e420a;
    gap:8px;
    box-sizing: border-box;
    border-radius: 3px;
    img{
        height: 16px;
    }
    :hover{
        background-color: rgba(0, 0, 0, 0.08);
    }
`

export const Icons = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    align-items: center;
    gap:5px;
    user-select: none;
    img{
        height: 16px;
        width: 16px;
        padding:8px;
        object-position: center;
        background-color: rgba(9, 30, 66, 0.04);
        border-radius: 50%;
        :hover{
            background-color: rgba(33, 33, 33, 0.121);
            cursor: pointer;
        }
    }
`

export const ChoiceModal = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-end;
    left:0;
    top:0;
    width: 100%;
    gap:5px;
    background-color: white;
    border: 1px solid #e9e9e9;
    border-radius: 3px;
    padding:10px;
    >div{
        width: 100%;
        margin:0;
        font-size: 14px;
    }
    h5{
        margin:0;
        color: grey;
        font-size: normal;
        font-weight: 600;
    }
    >input{
        outline: none;
        border: 1px solid grey;
        padding: 10px 10px;
        border-radius: 3px;
        box-sizing: border-box;
        width: 100%;
        transition: 0.2s;
        :focus {
            border: 1px solid #2a73e2;
        }
    }
`