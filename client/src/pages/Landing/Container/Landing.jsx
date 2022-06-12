import React from 'react';
import { Outlet } from 'react-router-dom';
import { Logo, AuthBox, LandingWrapper } from './styled'
import { Trello } from '../../../assets'

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