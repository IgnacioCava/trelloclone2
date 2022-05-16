import { Trello } from '../../../assets'
import { Outlet } from 'react-router-dom';
import { Logo, AuthBox, LandingWrapper } from './styled'

export default function Landing(){

    return (
        <LandingWrapper>
            <Logo src={Trello} alt='logo'/> 

            <AuthBox>
                <Outlet/>
            </AuthBox>
        </LandingWrapper>
    )
}