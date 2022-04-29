import logo from '../../../assets/Trello-logo.png';
import { Outlet, Navigate } from 'react-router-dom';
import { Logo, AuthBox, LandingWrapper } from './styled'

export default function Landing(){

    return (
        <LandingWrapper>
            <Logo src={logo} alt='logo'/> 

            <AuthBox>
                <Outlet/>
            </AuthBox>

        </LandingWrapper>
    )
}