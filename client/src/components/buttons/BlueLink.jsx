import React from 'react'
import { Link } from 'react-router-dom'
import { AuthAction } from './styled'

export default function Button({to, onClick, children, alternate, disabled}){
    return (
        <AuthAction alternate={alternate} disabled={disabled}>
            {
                to?
                <Link to={to}>
                    {children}
                </Link>
                :
                <button type='submit' onClick={onClick} disabled={disabled}>
                    {children}
                </button>
            }
        </AuthAction>
    )
}