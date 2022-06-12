import React from 'react';
import { Description, DescIcon, DescData } from './styled';

const Section = ({ title, icon, children }) => {

    return (
        <Description className="section">
            <DescIcon>
                <img src={icon} alt='text'/>
            </DescIcon>

            <DescData>
                {title?<h3>{title}</h3>:null}
                {children}
            </DescData>
        </Description>
    );
}

export default Section;