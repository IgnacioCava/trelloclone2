import { GET_BOARD, GET_BOARDS, CREATE_BOARD, BOARD_ERROR, CLEAR, RENAME_BOARD, ADD_LIST, DELETE_LIST, RENAME_LIST, ADD_CARD, DELETE_CARD, RENAME_CARD } from '../actions'

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
                    lists: [...state.thisBoard.lists.filter(list=>list._id!==state.thisBoard.lists.length-1), {...payload, _id: payload._id||state.thisBoard.lists.length, cards:[], archived: false }],
                    allCards: [...state.thisBoard.allCards]
                }
            }
        case DELETE_LIST:
            return {
                ...state,
                thisBoard: {
                    ...state.thisBoard,
                    lists: [...state.thisBoard.lists.filter(e=>e._id!==payload.id)],
                    allCards: state.thisBoard.lists.map(list=>list.cards).flat()
                }
            }
        case RENAME_LIST:
            return {
                ...state,
                thisBoard: {
                    ...state.thisBoard,
                    lists: state.thisBoard.lists.map(list=>list._id===payload.id? {...list, title: payload.title} : list)
                }
            }
        case ADD_CARD:
            return {
                ...state,
                thisBoard: {
                    ...state.thisBoard,
                    lists: [...state.thisBoard.lists.map(list=>list._id===payload.listId?
                        {
                            ...list, 
                            cards: [...list.cards.filter(card=>card._id!==list.cards.length-1), {...payload.card, archived:false, checklist:[], members:[], _id:payload.card._id||list.cards.length }]
                        } 
                        : list
                    )],
                    allCards: [
                        ...state.thisBoard.allCards.filter(card=>card._id!==state.thisBoard.allCards.length-1), 
                        {...payload.card, archived:false, checklist:[], members:[], _id:payload.card._id||state.thisBoard.allCards.length }
                    ]
                }
            }
        case DELETE_CARD:
            return {
                ...state,
                thisBoard: {
                    ...state.thisBoard,
                    lists: [...state.thisBoard.lists.map(list=>list._id===payload.listId?
                        {...list, cards: [...list.cards.filter(card=>card._id!==payload.cardId)]}
                        : list
                        )],
                    allCards: [...state.thisBoard.allCards.filter(e=>e._id!==payload.cardId)]
                }
            }
        case RENAME_CARD:
            return {
                ...state,
                thisBoard: {
                    ...state.thisBoard,
                    lists: [...state.thisBoard.lists.map(list=>list._id===payload.listId?
                        {
                            ...list,
                            cards: [...list.cards.map(card=>card._id===payload.cardId? {...card, title: payload.title} : card)]
                        }
                        : list
                        )],
                    allCards: [...state.thisBoard.allCards.map(card=>card._id===payload.cardId? {...card, title: payload.title} : card)]
                }
            }
        default:
            return state
    }
}
