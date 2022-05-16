import styled from "styled-components"

export const Description = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: flex-start;
    gap:10px;
`

export const DescIcon = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap:14px;
    padding:5px;
    img{
        height: 17px;
    }
    
`

export const DescData = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    gap:5px;
    h3{
        font-size: 14px;
        font-weight: 400;
        margin: 3px 0;
        word-break: break-all;
    }
`