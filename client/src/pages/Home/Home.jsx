import { withAuth } from "../../store/contexts/withAuth";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Home = withAuth(({state, actions}) =>{
    const { loadUser, logout } = actions
    const [ username, error ] = [state.user?.username, state.user?.error]
    const navigate = useNavigate()
    useEffect(() => {
        if(localStorage.token) (async ()=> await loadUser())()
        else navigate('/login')
    }, [localStorage.token])

    if(username&&!error) return (
        <div>
            <h1>Home</h1>
            <span>{JSON.stringify(state.user)}</span>
            <button onClick={logout}>Log Out</button>
        </div>
    );
})

export default Home;