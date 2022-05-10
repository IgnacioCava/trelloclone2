import styled from "styled-components"

export const Completed = styled.div`
    display: flex;
    align-items: center;
    background-color: ${props=>props.status?'#61bd4f':'transparent'};
    padding: 0 5px;
    line-height: 25px;
    border-radius: 5px;
    color: ${props=>props.status?'white':'black'};
    gap:5px;
    user-select: none;
    span{
        padding-bottom:2px;
    }
`

export const WithLabel = styled.div`
    display: flex;
    width: 85%;
    gap:5px;
    flex-direction: column;
`

export const Label = styled.div`
    background-color: ${props=>props.color};
    width: fit-content;
    height: 50%;
    min-height: 20px;
    min-width: 30px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 13px;
    line-height: 26px;
    font-weight: 500;
    border-radius: 3px;
    padding: 0 10px;
    user-select: none;
    color: ${props=>props.color?'white':'black'};
    :hover{
        filter: brightness(1.1);
    }
`

export const MemberIcon = styled.span`
    height: 28px;
    width: 28px;
    line-height: 28px;
    border-radius: 50%;
    background-color: ${props=>props.color};
    user-select: none;
    :hover{
        filter: brightness(1.05);
    }
`

export const CardIcons = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    gap:14px;
    img{
        height: 13px;
    }
`

export const MemberIcons = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    gap: 3px;
`


export const Body = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    padding: 4px;
    box-sizing: border-box;
`

export const Title = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    width: 100%;
`

export const CardHolder = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    border: 1px solid #ccc;
    background-color: #ffffff;
    border-radius: 5px;
    padding:5px;
    gap:5px;
    box-sizing: border-box;
    box-shadow: 0px 1px 0px #ccc;
`