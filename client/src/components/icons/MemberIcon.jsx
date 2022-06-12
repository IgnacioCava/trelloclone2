import React from 'react';
import { Icon } from './styled'

const MemberIcon = ({member, diameter, onClick}) => {
    return (
        <Icon color={member.color} title={member.username} diameter={diameter||32} onClick={onClick}>
            {member.username.charAt(0)}
        </Icon>
    )
}

export default MemberIcon