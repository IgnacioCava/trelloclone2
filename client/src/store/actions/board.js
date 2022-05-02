import { GET_BOARD, GET_BOARDS, CREATE_BOARD, BOARD_ERROR, CLEAR } from '../actions'
import axios from 'axios'

const config = {
    headers: {
        'Content-Type': 'application/json',
        token: localStorage.getItem('token')
    }
}

function act (dispatch, type, payload) {
    dispatch({type,payload})
}

export const getBoards = () => async dispatch => {
    try {
        const res = await axios.get('/api/boards', config)
        act(dispatch, GET_BOARDS, res.data)
    } catch (err) {
        act(dispatch, BOARD_ERROR, err.response.data.message)
    }
}

export const clear = () => dispatch => act(dispatch, CLEAR)


export const getBoard = id => async dispatch => {
    try {
        const res = await axios.get(`/api/boards/${id}`, config)
        act(dispatch, GET_BOARD, res.data)
    } catch (err) {
        act(dispatch, BOARD_ERROR, err.response.data.message)
    }
}

export const createBoard = formData => async dispatch => {
    try {
        const body = JSON.stringify(formData)
        const res = await axios.post('/api/boards', body, config)
        act(dispatch, CREATE_BOARD, res.data)
    } catch (err) {
        act(dispatch, BOARD_ERROR, err.response.data.message)
    }
}

// export const deleteBoard = (id) => async dispatch => {
//     try {
//         await axios.delete(`/api/boards/${id}`, config)
//         act(dispatch, DELETE_BOARD, id)
//     } catch (err) {
//         act(dispatch, BOARD_ERROR, err.response.data.message)
//     }
// }