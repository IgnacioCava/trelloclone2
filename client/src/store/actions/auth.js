import { SET_USER, LOGOUT, AUTH_ERROR, ADD } from '.'
import axios from 'axios'

const config = {
    headers: {
        'Content-Type': 'application/json'
    }
}

export const register = formData => async dispatch => {
    try{
        const body = JSON.stringify(formData)
        const response = await axios.post('/api/auth/register', config, body)
        localStorage.setItem('token', response.data.token)
        dispatch({
            type: SET_USER,
            payload: response.data
        })
    }
    catch(error){
        dispatch({
            type: AUTH_ERROR,
            payload: error.response.data.message
        })
    }
}

export const login = formData => async dispatch => {
    try{
        const body = JSON.stringify(formData)
        const response = await axios.post('/api/auth/login', config, body)
        localStorage.setItem('token', response.data.token)
        dispatch({
            type: SET_USER,
            payload: response.data
        })
    }
    catch(error){
        dispatch({
            type: AUTH_ERROR,
            payload: error.response.data.message
        })
    }
}

export const logout = () => dispatch => {
    localStorage.removeItem('token')
    dispatch({
        type: LOGOUT
    })
}