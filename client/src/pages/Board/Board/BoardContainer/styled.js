import styled from "styled-components"

export const Lists = styled.div`   
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    height: fit-content;
`

export const BoardWrapper = styled.div`
    padding-left:10px;
    height: 100%;
    width: 100%;
    overflow: auto;
    position: relative;
    ::-webkit-scrollbar {
        height: 10px;
        background: transparent;
    }
    ::-webkit-scrollbar-thumb {
        background: #2a74e26b;
        border-radius: 5px;
    }
`

export const Members = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    margin: 10px 4px;
    gap: 5px;
`

export const All = styled.div`
    display: flex;
    gap:5px;
    height: calc(100% - 60px);
    background-image: ${props => props.background? `url(${props.background})` : 'none'};
    background-size: cover;
`

export const Background = styled.div`
    width: 274px;
    margin-left:4px;
`

export const BoardOptions = styled.div`
    display: flex;
    align-items: center;
    margin-top: 5px;
`