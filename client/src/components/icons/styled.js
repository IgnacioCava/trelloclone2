import styled from "styled-components"

export const Icon = styled.div`
    width: ${props=>props.diameter+'px'} !important;
    height: ${props=>props.diameter+'px'} !important;
    line-height: ${props=>props.diameter+'px'} !important;
    border-radius: 50% !important;
    background-color: ${props=>props.color};
    user-select: none;
    font-size: ${props=>props.diameter/2+'px'} !important;
    :hover{
        filter: brightness(1.05);
    }
`