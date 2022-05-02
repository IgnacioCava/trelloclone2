import { CloseButton } from './styled';

export default function Close({onClick, type}){
    return <CloseButton type={type||'button'} onClick={onClick}>x</CloseButton>
}