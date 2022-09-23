import { SET_USER, LOGOUT, AUTH_ERROR } from '.'
import baseURL from '../../settings/apiRequest'

export const register = (formData, redirect) => async dispatch => {
    try{
        const body = JSON.stringify(formData)
        const response = await baseURL.post('/auth/register', body )
        localStorage.setItem('token', response.data.token)
        await dispatch(loadUser())
        redirect()
    }
    catch(error){
        dispatch({
            type: AUTH_ERROR,
            payload: error.response.data.message
        })
    }
}

export const login = (formData, redirect) => async dispatch => {
    try{
        const body = JSON.stringify(formData)
        const response = await baseURL.post('/auth/login', body )
        localStorage.setItem('token', response.data.token)
        await dispatch(loadUser())
        redirect()
    }
    catch(error){
        dispatch({
            type: AUTH_ERROR,
            payload: error.response.data.message
        })
    }
}

export const loadUser = () => async (dispatch) => { 
    try {
        const token = localStorage.getItem('token')

        const res = await baseURL.get('/auth', {headers: {token}});
        dispatch({
            type: SET_USER,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: AUTH_ERROR,
        });
    }
}

export const logout = () => dispatch => {
    localStorage.removeItem('token')
    dispatch({
        type: LOGOUT
    })
}