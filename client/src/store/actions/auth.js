import { SET_USER, LOGOUT, AUTH_ERROR } from '.'
import axios from 'axios'

const config = {
    headers: {
        'Content-Type': 'application/json'
    }
}

export const register = (formData, redirect) => async dispatch => {
    try{
        const body = JSON.stringify(formData)
        const response = await axios.post('/auth/register', body, config )
        localStorage.setItem('token', response.data.token)
        dispatch(loadUser())
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
        const response = await axios.post('/auth/login', body, config )
        localStorage.setItem('token', response.data.token)
        dispatch(loadUser())
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
    const token = localStorage.getItem('token')

    try {
        const res = await axios.get('/auth', {headers: {token}});
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