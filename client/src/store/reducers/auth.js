import { SET_USER, LOGOUT, AUTH_ERROR } from '../actions'

export const authState = {
    user: null,
    error: null
}

export const authReducer = (state, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.payload
            }
        case LOGOUT:
            return {
                ...state,
                user: null
            }
        case AUTH_ERROR:
            return {
                ...state,
                error: action.payload,
                user: null
            }
        default:
            return state
    }
}