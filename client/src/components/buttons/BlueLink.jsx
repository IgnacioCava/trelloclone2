import { Link } from 'react-router-dom'
import { AuthAction } from './styled'

export default function Button({to, children}){
    return (
        <AuthAction>
            {
                to?
                <Link to={to}>
                    {children}
                </Link>
                :
                <button type='submit'>
                    {children}
                </button>
            }
        </AuthAction>
    )
}