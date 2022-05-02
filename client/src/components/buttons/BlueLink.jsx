import { Link } from 'react-router-dom'
import { AuthAction } from './styled'

export default function Button({to, text, children}){
    return (
        <AuthAction>
            {
                to?
                <Link to={to}>
                    {text||children}
                </Link>
                :
                <button type='submit'>
                    {text||children}
                </button>
            }
        </AuthAction>
    )
}