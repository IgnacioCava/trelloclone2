import { GET_BOARD, GET_BOARDS, CREATE_BOARD, BOARD_ERROR, CLEAR, RENAME_BOARD, ADD_LIST, DELETE_LIST, RENAME_LIST, ADD_CARD, DELETE_CARD, RENAME_CARD } from '../actions'
import axios from 'axios'

const config = {
    headers: {
        'Content-Type': 'application/json',
        token: localStorage.getItem('token')
    }
}

const act = (dispatch, type, payload) => dispatch({type,payload})

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
        if (res) axios.defaults.headers.common['boardId'] = id;
        else delete axios.defaults.headers.common['boardId'];
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

export const renameBoard = (id, title) => async dispatch => {
    try {
        act(dispatch, RENAME_BOARD, {id, title})
        const body = JSON.stringify({title})
        await axios.patch(`/api/boards/rename/${id}`, body, config)
    } catch (err) {
        act(dispatch, BOARD_ERROR, err.response.data.message)
    }
}

export const addList = title => async dispatch => {
    try {
        act(dispatch, ADD_LIST, {title})
        const body = JSON.stringify({title})
        const res = await axios.post(`/api/lists`, body, config)
        act(dispatch, ADD_LIST, res.data)
    } catch (err) {
        act(dispatch, BOARD_ERROR, err.response.data.message)
    }
}

export const deleteList = id => async dispatch => {
    try {
        act(dispatch, DELETE_LIST, {id})
        await axios.delete(`/api/lists/${id}`, config)
    } catch (err) {
        act(dispatch, BOARD_ERROR, err.response.data.message)
    }
}

export const renameList = (id, title) => async dispatch => {
    try {
        act(dispatch, RENAME_LIST, {id, title})
        const body = JSON.stringify({title})
        await axios.patch(`/api/lists/rename/${id}`, body, config)
    } catch (err) {
        act(dispatch, BOARD_ERROR, err.response.data.message)
    }
}

export const addCard = (listId, title) => async dispatch => {
    try {
        act(dispatch, ADD_CARD, {listId, card:{title}})
        const body = JSON.stringify({listId, title})
        const res = await axios.post(`/api/cards`, body, config)
        act(dispatch, ADD_CARD, res.data)
    } catch (err) {
        act(dispatch, BOARD_ERROR, err.response.data.message)
    }
}

export const deleteCard = (listId, cardId) => async dispatch => {
    try {
        act(dispatch, DELETE_CARD, {listId, cardId})
        await axios.delete(`/api/cards/${listId}/${cardId}`, config)
    } catch (err) {
        act(dispatch, BOARD_ERROR, err.response.data.message)
    }
}

export const renameCard = (listId, cardId, title) => async dispatch => {
    try {
        act(dispatch, RENAME_CARD, {listId, cardId, title})
        const body = JSON.stringify({title})
        await axios.patch(`/api/cards/edit/${cardId}`, body, config)
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