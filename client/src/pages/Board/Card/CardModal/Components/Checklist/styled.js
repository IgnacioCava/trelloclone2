import styled from "styled-components"

export const Progress = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: fit-content;
    gap: 15px;
    span{
        color: #5e6c84;
        font-size: 11px;
        line-height: 10px;
        text-align: center;
        width: 32px;
    }
`
export const Max = styled.div`
    width: 100%;
    height: fit-content;
    background-color: #00000014;
    display: flex;
    height: 10px;
    border-radius: 5px;
    overflow: hidden;
`

export const Current = styled.div`
    transition: all 0.5s;
    width: ${props=>props.status+'%'};
    background-color: ${props=>props.status===100?'green':'#2a73e2'};
    text-align: end;
    color: white;
`

export const Title = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
    width: 100%;
    >div{
        width: 100%;
        max-width: 100%;
        overflow:hidden;
        >*{
            width: 100%;
        max-width: 100%;
        overflow:hidden;
        }
    }
`

export const ChecklistItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 5px;
    width: 100%;
    box-sizing: border-box;
    border-radius: 5px;
    font-size: 14px;
    gap:5px;
    
    input[type=checkbox]{
        height:20px;
        width:20px;
        filter: ${props => props.status ? 'hue-rotate(270deg)':'hue-rotate(0deg)'};
    }
    input[type=text]{
        width: 100%;
    }
    >div{
        width: 100%;
        max-width: 100%;
        overflow:hidden;
        >*{
            color: ${props=>props.checked?'#5e6c84':'inherit'} !important;
            text-decoration: ${props=>props.checked?'line-through':'none'};
            width: 100%;
            max-width: 100%;
            overflow:hidden;
        }
    }
    &:hover{
        background-color: #e4e4e4;
    }
`

export const Checklist = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    padding: 10px;
    box-sizing: border-box;
    border: 1px solid #e6e6e6;
    background-color: #fafafa;
    border-radius: 3px;
    width: 100%;
    max-width: 100%;
    gap:5px;
`
