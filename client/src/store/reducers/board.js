import { GET_BOARD, GET_BOARDS, CREATE_BOARD, BOARD_ERROR, CLEAR } from '../actions'

export const boardState = {
    boards: [],
    thisBoard: {
        allCards: []
    },
    error: null
}

export const boardReducer = (state, action) => {
    const { type, payload } = action

    switch (type) {
        case GET_BOARDS:
            return {
                ...state,
                boards: payload
            }
        case GET_BOARD:
            return {
                ...state,
                thisBoard: {...payload, allCards: payload.lists.map(e=>e.cards).flat()}
            }
        case CREATE_BOARD:
            return {
                ...state,
                boards: [payload, ...state.boards]
            }
        case CLEAR:
            return {
                ...state,
                thisBoard: {
                    allCards: []
                }
        }
        default:
            return state
    }
}
