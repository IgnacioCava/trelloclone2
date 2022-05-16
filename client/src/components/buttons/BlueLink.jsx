import { Link } from 'react-router-dom'
import { AuthAction } from './styled'

export default function Button({to, onClick, children}){
    return (
        <AuthAction>
            {
                to?
                <Link to={to}>
                    {children}
                </Link>
                :
                <button type='submit' onClick={onClick}>
                    {children}
                </button>
            }
        </AuthAction>
    )
}