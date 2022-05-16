import { withAuth } from "../../store/contexts/withAuth"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { NavBar, Buttons, LogOut } from './styled'

const Navbar = withAuth(({state, actions}) => {
    const {  logout, loadUser } = actions
    const [ username, error ] = [state.user?.username, state.user?.error]

    const navigate = useNavigate()
    useEffect(() => {
        if(localStorage.token) (async ()=> await loadUser())()
        else navigate('/login')
    }, [localStorage.token])

    return (
        <NavBar>
            <span>Welcome{ username? ', '+username : '...' }</span>
            <Buttons>
                <button onClick={()=>navigate('/home')}>Home</button>
                <LogOut onClick={()=>logout()}>Log Out</LogOut>
            </Buttons>
        </NavBar>
    )
})

export default Navbar

