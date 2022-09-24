import styled from "styled-components"

export const ScrollArea = styled.div`
    height: 100%;
    display:flex;
    flex-direction: column;
    padding: 0 10px 0 0;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    gap:20px;
    *{
        margin:0;
        text-align: left;
    }
    ::-webkit-scrollbar {
        width: 10px;
    }
    ::-webkit-scrollbar-thumb {
        background-color: #2a73e2;
        border-radius: 10px;
    }
` 

export const TopData = styled.div`
    display: flex;
    gap: 10px;
    margin-left: 41px;
`

export const Label = styled.div`
    background-color: ${props=>props.color};
    width: 100%;
    height: 100%;
    max-height: 37px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    line-height: 100%;
    font-weight: 500;
    border-radius: 3px;
    color:white;
    user-select: none;
    color: ${props=>props.color?'white':'black'};
    :hover{
        filter: brightness(1.1);
    }
`

export const Icons = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: flex-start;
    width: 100%;
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

export const Data = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    gap:5px;
    h5{
        margin:0;
        color: grey;
        font-size: normal;
        font-weight: 600;
    }
`

export const ModalData = styled.div`
    display: flex;
    flex-direction: column;
    gap:20px;
    width: 75%;
`

export const ModalOptions = styled.div`
    display: flex;
    flex-direction: column;
    width: 25%;
    >span{
        font-size: 12px;
        font-weight: 600;
        color: #5e6c84;
        text-align: start;
    }
    >div{
        flex-direction: column;
        display: flex;
        gap:8px;
        height: 100%;
    }
`

export const ModalBody = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    gap: 15px;
    overflow: auto;
    @media (max-width: 768px) {
        flex-direction: column-reverse;
        ${ModalOptions}{
            margin-left: 41px;
            width: unset;
            >div{
                >div >div >img{ display:none; }
                flex-direction: row;
            } 
        }
        ${ModalData}{
            width: 100%;
        }
    }
`

export const From = styled.div`
    display: flex;
    width: 90%;
    flex-direction: column;
`

export const FromList = styled.span`
    display: flex;
    gap:5px;
    align-items: center;
    text-align: start;
    width: 100%;
    box-sizing: border-box;
    color:grey;
    margin-bottom: 10px;
    img{
        height: 20px;
    }
`

export const Underline = styled.span`
    text-decoration: underline;
`

export const Title = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    width: 100%;
    div{
        padding: 0;
    }
    div, input{
        width: 100%;
        max-width: 100%;
    }
    h3{
        font-size: 1.5rem;
    }
`

export const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 768px;
    max-width: 90%;
    height: 90%;
    border: 1px solid #ccc;
    background-color: #f4f5f7;
    padding: 1rem;
    border-radius: 2px;
    margin-top: 1rem;
    margin-bottom: 1rem;
    gap:15px;
`

export const Modal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.512);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 1;
    padding: 0;
    margin: 0;
    border: 0;
    border-radius: 0;
    box-sizing: border-box;
    box-shadow: 0 0 0 0;
    transition: all 0.3s ease-in-out;
`

export const Positioner = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    width: 100%;
`