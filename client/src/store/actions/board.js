import 
{ GET_BOARD, GET_BOARDS, CREATE_BOARD, BOARD_ERROR, CLEAR, RENAME_BOARD, ADD_LIST, DELETE_LIST, RENAME_LIST, ADD_CARD, 
    DELETE_CARD, EDIT_CARD, TOGGLE_CARD_MEMBER, GET_USER, ADD_CHECKLIST, EDIT_CHECKLIST, DELETE_CHECKLIST, ADD_CHECKLIST_ITEM, 
    EDIT_CHECKLIST_ITEM, DELETE_CHECKLIST_ITEM, ADD_MEMBER, DELETE_MEMBER, TOGGLE_LIST_STATUS, TOGGLE_CARD_STATUS, 
    GET_ACTIVITY, CHANGE_BOARD_BACKGROUND, SORT_BOARD_LISTS, SORT_LIST_CARDS }
from '../actions'
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
        const res = await axios.get('/api/boards', {headers: {...config.headers, token: localStorage.token}})
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
        if (res) {
            axios.defaults.headers.common['boardId'] = id;
            axios.defaults.headers.common['token'] = localStorage.token;
        }
        else {
            delete axios.defaults.headers.common['boardId'];
            delete axios.defaults.headers.common['token'];
        }
    } catch (err) {
        act(dispatch, BOARD_ERROR, err.response.data.message)
    }
    getActivity()(dispatch)
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
    getActivity()(dispatch)
}

export const sortBoardLists = (newListSort) => async dispatch => {
    try {
        act(dispatch, SORT_BOARD_LISTS, newListSort)
        const body = JSON.stringify({newListSort: newListSort.map(e=>e._id)})
        await axios.patch(`/api/boards/sort`, body, config)
    } catch (err) {
        act(dispatch, BOARD_ERROR, err.response.data.message)
    }
}

export const changeBoardBackground = (id, backgroundURL) => async dispatch => {
    const img = new Image()
    img.src = backgroundURL
    if(img.complete){
        try {
            act(dispatch, CHANGE_BOARD_BACKGROUND, {backgroundURL})
            const body = JSON.stringify({backgroundURL})
            await axios.patch(`/api/boards/background/${id}`, body, config)
        } catch (err) {
            act(dispatch, BOARD_ERROR, err.response.data.message)
        }
    }
    else{
        img.onload = () => {
            try {
                act(dispatch, CHANGE_BOARD_BACKGROUND, {backgroundURL})
                const body = JSON.stringify({backgroundURL})
                axios.patch(`/api/boards/background/${id}`, body, config)
            } catch (err) {
                act(dispatch, BOARD_ERROR, err.response.data.message)
            }
        }
        img.onerror = () => {
            act(dispatch, BOARD_ERROR)
        }
    }
    getActivity()(dispatch)
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
    getActivity()(dispatch)
}

export const deleteList = id => async dispatch => {
    try {
        act(dispatch, DELETE_LIST, {id})
        await axios.delete(`/api/lists/${id}`, config)
    } catch (err) {
        act(dispatch, BOARD_ERROR, err.response.data.message)
    }
    getActivity()(dispatch)
}

export const renameList = (id, title) => async dispatch => {
    try {
        act(dispatch, RENAME_LIST, {id, title})
        const body = JSON.stringify({title})
        await axios.patch(`/api/lists/rename/${id}`, body, config)
    } catch (err) {
        act(dispatch, BOARD_ERROR, err.response.data.message)
    }
    getActivity()(dispatch)
}

export const sortListCards = (id, newCardSort) => async dispatch => {
    try {
        act(dispatch, SORT_LIST_CARDS, {id, newCardSort})
        const body = JSON.stringify({newCardSort: newCardSort.map(e=>e._id)})
        await axios.patch(`/api/lists/sort/${id}`, body, config)
    } catch (err) {
        act(dispatch, BOARD_ERROR, err.response.data.message)
    }
}

export const toggleListStatus = listId => async dispatch => {
    try {
        act(dispatch, TOGGLE_LIST_STATUS, {listId})
        await axios.patch(`/api/lists/archive/${listId}`, config)
    } catch (err) {
        act(dispatch, BOARD_ERROR, err.response.data.message)
    }
    getActivity()(dispatch)
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
    getActivity()(dispatch)
}

export const deleteCard = (listId, cardId) => async dispatch => {
    try {
        act(dispatch, DELETE_CARD, {listId, cardId})
        await axios.delete(`/api/cards/${listId}/${cardId}`, config)
    } catch (err) {
        act(dispatch, BOARD_ERROR, err.response.data.message)
    }
    getActivity()(dispatch)
}

export const editCard = (formData, cardId, listId) => async dispatch => {
    try {
        act(dispatch, EDIT_CARD, {listId, cardId, card:formData})
        const body = JSON.stringify(formData)
        await axios.patch(`/api/cards/edit/${cardId}`, body, config)
    } catch (err) {
        act(dispatch, BOARD_ERROR, err.response.data.message)
    }
    getActivity()(dispatch)
}

export const toggleCardStatus = (listId, cardId) => async dispatch => {
    try {
        act(dispatch, TOGGLE_CARD_STATUS, {listId, cardId})
        await axios.patch(`/api/cards/archive/${cardId}`, config)
    } catch (err) {
        act(dispatch, BOARD_ERROR, err.response.data.message)
    }
    getActivity()(dispatch)
}

export const getUser = () => async dispatch => {
    try {
        const res = await axios.get(`/api/users/token`, config)
        act(dispatch, GET_USER, res.data)
    } catch (err) {
        act(dispatch, BOARD_ERROR, err.response.data.message)
    }
}

export const toggleCardMember = (user, cardId, listId) => async dispatch => {
    try {
        act(dispatch, TOGGLE_CARD_MEMBER, {user, cardId, listId})
        await axios.put(`/api/cards/togglemember/${user.user}/${cardId}`)
    } catch (err) {
        act(dispatch, BOARD_ERROR, err.response.data.message)
    }
    getActivity()(dispatch)
}

export const addChecklist = (title, cardId, listId) => async dispatch => {
    try {
        act(dispatch, ADD_CHECKLIST, {title, cardId, listId})
        const body = JSON.stringify({title})
        const res = await axios.post(`/api/checklists/${cardId}`, body, config)
        act(dispatch, ADD_CHECKLIST, {_id: res.data, title, cardId, listId})
    } catch (err) {
        act(dispatch, BOARD_ERROR, err.response.data.message)
    }
}

export const deleteChecklist = (checklistId, cardId, listId) => async dispatch => {
    try {
        act(dispatch, DELETE_CHECKLIST, {checklistId, cardId, listId})
        await axios.delete(`/api/checklists/${cardId}/${checklistId}`, config)
    } catch (err) {
        act(dispatch, BOARD_ERROR, err.response.data.message)
    }
}

export const renameChecklist = (title, checklistId, cardId, listId) => async dispatch => {
    try {
        act(dispatch, EDIT_CHECKLIST, {checklist:{title}, checklistId, cardId, listId})
        const body = JSON.stringify({title})
        await axios.patch(`/api/checklists/${cardId}/${checklistId}`, body, config)
    } catch (err) {
        act(dispatch, BOARD_ERROR, err.response.data.message)
    }
}

export const addChecklistItem = (text, checklistId, cardId, listId) => async dispatch => {
    try {
        act(dispatch, ADD_CHECKLIST_ITEM, {text, checklistId, cardId, listId})
        const body = JSON.stringify({text})
        const res = await axios.post(`/api/checklists/item/${cardId}/${checklistId}`, body, config)
        act(dispatch, ADD_CHECKLIST_ITEM, {_id: res.data._id, text, cardId, listId, checklistId})
    } catch (err) {
        act(dispatch, BOARD_ERROR, err.response.data.message)
    }
}

export const deleteChecklistItem = (itemId, checklistId, cardId, listId) => async dispatch => {
    try {
        act(dispatch, DELETE_CHECKLIST_ITEM, {itemId, checklistId, cardId, listId})
        await axios.delete(`/api/checklists/item/${cardId}/${checklistId}/${itemId}`, config)
    } catch (err) {
        act(dispatch, BOARD_ERROR, err.response.data.message)
    }
}

export const editChecklistItem = (formData, itemId, checklistId, cardId, listId) => async dispatch => {
    try {
        act(dispatch, EDIT_CHECKLIST_ITEM, {formData, itemId, checklistId, cardId, listId})
        const body = JSON.stringify(formData)
        await axios.patch(`/api/checklists/item/${cardId}/${checklistId}/${itemId}`, body, config)
    } catch (err) {
        act(dispatch, BOARD_ERROR, err.response.data.message)
    }
}

export const addMember = (user) => async dispatch => {
    try {
        const res = await axios.put(`/api/boards/members/add/${user._id}`, config)
        act(dispatch, ADD_MEMBER, res.data)
    } catch (err) {
        act(dispatch, BOARD_ERROR, err.response.data.message)
    }
}

export const deleteMember = (user) => async dispatch => {
    try {
        act(dispatch, DELETE_MEMBER, user.user)
        await axios.put(`/api/boards/members/remove/${user.user}`, config)
    } catch (err) {
        act(dispatch, BOARD_ERROR, err.response.data.message)
    }
}

export const findUsers = async (query)  => {
    return (await axios.get(`/api/users/email/${query}`)).data
}

export const getActivity = (id) => async dispatch => {
    try {
        const res = await axios.get(`/api/boards/activity/${id}`, config)
        act(dispatch, GET_ACTIVITY, res.data)
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