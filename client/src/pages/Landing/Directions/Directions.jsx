import Link from '../../../components/buttons/BlueLink'
import { MainWrapper, Actions } from './styled'

export default function Main(){
    return (
        <MainWrapper>
            <h2>Welcome to Trello</h2>

            <Actions>
                <Link to='login'>Log In</Link>
                <Link to='register'>Sign Up</Link>
            </Actions>
            
        </MainWrapper>
    )
}