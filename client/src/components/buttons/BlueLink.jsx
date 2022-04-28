import {Link} from 'react-router-dom'
import { AuthAction } from './styled'

export default function Login({to, text}){
    return (
        <AuthAction>
            {
                to?
                <Link to={to}>
                    {text}
                </Link>
                :
                <button type='submit'>
                    {text}
                </button>
            }
        </AuthAction>
    )
}