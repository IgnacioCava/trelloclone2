import { GET_BOARD, GET_BOARDS, CREATE_BOARD, BOARD_ERROR, CLEAR, RENAME_BOARD, ADD_LIST, DELETE_LIST, RENAME_LIST } from '../actions'

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
                thisBoard: { allCards: [] }
            }
        case RENAME_BOARD:
            return {
                ...state,
                boards: state.boards.map(board=> board._id===payload.id? {...board, title: payload.title} : board),
                thisBoard: {
                    ...state.thisBoard,
                    title: payload.title
                }
            }
        case ADD_LIST:
            return {
                ...state,
                thisBoard: {
                    ...state.thisBoard,
                    lists: [...state.thisBoard.lists.filter(e=>e._id!==state.thisBoard.lists.length-1), {...payload, _id: payload._id||state.thisBoard.lists.length, cards:[], archived: false }],
                    allCards: [...state.thisBoard.allCards, payload.cards]
                }
            }
        case DELETE_LIST:
            return {
                ...state,
                thisBoard: {
                    ...state.thisBoard,
                    lists: [...state.thisBoard.lists.filter(e=>e._id!==payload.id)],
                    allCards: state.thisBoard.lists.map(e=>e.cards).flat()
                }
            }
        case RENAME_LIST:
            return {
                ...state,
                thisBoard: {
                    ...state.thisBoard,
                    lists: state.thisBoard.lists.map(e=>e._id===payload.id? {...e, title: payload.title} : e)
                }
            }
        default:
            return state
    }
}
