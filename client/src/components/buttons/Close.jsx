import { CloseButton } from './styled';
import { cross } from '../../assets';

export default function Close({onClick, type}){
    return <CloseButton src={cross} alt='close' onClick={onClick}/>
}