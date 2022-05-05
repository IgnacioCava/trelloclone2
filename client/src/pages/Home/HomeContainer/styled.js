import styled from 'styled-components';

export const HomeWrapper = styled.div`
    position:relative;
    height:100%;
    display:flex;
    flex-direction:column;
    justify-content: flex-start;
    align-items:center;
    padding:0;
    margin:0;
    border:0;
    background-color:white;
    overflow: hidden;
`

export const BoardBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: ${props => props.width+'%'};
    height: 100px;
    background-color: #fafbfc;
    overflow: hidden;
    box-shadow: 0px 0px 10px rgba(0,0,0,0.2);
    transition: .2s;
    margin: ${props => {
        const { width } = props;
        let [maxElements, extraSpace] = (100/width).toString().split('.');
        extraSpace = extraSpace? Number('.'+extraSpace) : 0;
        const elementMargin = ((width*Number(extraSpace))/maxElements)/2+'%';
        return `1% ${elementMargin}`;
        }
    };
    h1{
        font-size: 20px;
        font-weight: bold;
        margin: 0;
    }
    a{
        display: flex;
        text-decoration: none;
        color: black;
        font-size: 20px;
        font-weight: bold;
        margin: 0;
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        align-items: flex-start;
        justify-content: flex-start;
        padding:10px;
    }
    :hover{
        background-color: #c6d0ff;
    }
    @media (max-width: 768px) {
        width: 100%;
    }
`

export const Boards = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    width: 95%;
    border: 10px solid white;
    background-color: white;
    margin:10px;
    box-sizing: border-box;
    height: fit-content;
    gap: available;
    overflow:auto;
    ::-webkit-scrollbar{
        width: 10px;
        background-color: transparent;
    }
    ::-webkit-scrollbar-thumb{
        background-color: #c6d0ff;
        border-radius: 10px;
        
    }
`