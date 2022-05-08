import { GET_BOARD, GET_BOARDS, CREATE_BOARD, BOARD_ERROR, CLEAR, RENAME_BOARD, ADD_LIST, DELETE_LIST, RENAME_LIST, ADD_CARD, DELETE_CARD, EDIT_CARD, GET_USER, TOGGLE_CARD_MEMBER, ADD_CHECKLIST, EDIT_CHECKLIST, DELETE_CHECKLIST, ADD_CHECKLIST_ITEM, EDIT_CHECKLIST_ITEM, DELETE_CHECKLIST_ITEM } from '../actions'

export const boardState = {
    boards: [],
    thisBoard: {
        allCards: []
    },
    user: {},
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
                    lists: [...state.thisBoard.lists.filter(list=>list._id!==state.thisBoard.lists.length-1), {...payload, _id: payload._id||state.thisBoard.lists.length, cards:[], archived: false}],
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
                        { ...list, cards: [...list.cards.filter(card=>card._id!==list.cards.length-1), {...payload.card, archived:false, members:payload.card.members||[], checklists:[], _id:payload.card._id||list.cards.length }]} 
                        : list
                    )],
                    allCards: [
                        ...state.thisBoard.allCards.filter(card=>card._id!==state.thisBoard.allCards.length-1), 
                        {...payload.card, archived:false, checklists:[], members:payload.card.members||[], _id:payload.card._id||state.thisBoard.allCards.length }
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
        case EDIT_CARD:
            return {
                ...state,
                thisBoard: {
                    ...state.thisBoard,
                    lists: [...state.thisBoard.lists.map(list=>list._id===payload.listId?
                        { ...list, cards: [...list.cards.map(card=>card._id===payload.cardId? {...card, ...payload.card} : card)] }
                        : list
                        )],
                    allCards: [...state.thisBoard.allCards.map(card=>card._id===payload.cardId? {...card, ...payload.card} : card)]
                }
            }
        case GET_USER:
            return {
                ...state,
                user: payload
            }
        case TOGGLE_CARD_MEMBER:
            return {
                ...state,
                thisBoard: {
                    ...state.thisBoard,
                    lists: [...state.thisBoard.lists.map(list=>list._id===payload.listId?
                        { ...list, cards: [...list.cards.map(card=>card._id===payload.cardId? 
                            {...card, 
                                members: card.members.findIndex(member=>member.user===payload.user.user)>-1?
                                card.members.filter(member=>member.user!==payload.user.user) : [...card.members, payload.user]
                            } : card)]} : list)],
                    allCards: [...state.thisBoard.allCards.map(card=>card._id===payload.cardId? 
                        {...card, members: card.members.filter(member=>member.user!==payload.userId)}
                        : card)]
                }
            }
        case ADD_CHECKLIST:
            return {
                ...state,
                thisBoard: {
                    ...state.thisBoard,
                    lists: [...state.thisBoard.lists.map(list=>list._id===payload.listId?
                        { ...list, 
                            cards: [
                                ...list.cards.map(card=>card._id===payload.cardId?
                                    {...card, checklists: [ ...card.checklists.filter(checklist=>checklist._id!==card.checklists.length-1), {_id: payload._id||card.checklists.length, title: payload.title, items: []}]} : card)
                            ]
                        } : list)],
                    allCards: [...state.thisBoard.allCards.map(card=>card._id===payload.cardId?
                        {...card, checklists: [ ...card.checklists.filter(checklist=>checklist._id!==card.checklists.length-1), {_id: payload._id||card.checklists.length, title: payload.title, items: []}]} : card)]
                }
            }
        case DELETE_CHECKLIST:
            return {
                ...state,
                thisBoard: {
                    ...state.thisBoard,
                    lists: [...state.thisBoard.lists.map(list=>list._id===payload.listId?
                        { ...list,
                            cards: [
                                ...list.cards.map(card=>card._id===payload.cardId?
                                    {...card, checklists: [ ...card.checklists.filter(checklist=>checklist._id!==payload.checklistId)]} : card)
                            ]
                        } : list)],
                    allCards: [...state.thisBoard.allCards.map(card=>card._id===payload.cardId?
                        {...card, checklists: [ ...card.checklists.filter(checklist=>checklist._id!==payload.checklistId)]} : card)]
                }
            }
        case EDIT_CHECKLIST:
            return {
                ...state,
                thisBoard: {
                    ...state.thisBoard,
                    lists: [...state.thisBoard.lists.map(list=>list._id===payload.listId?
                        { ...list,
                            cards: [
                                ...list.cards.map(card=>card._id===payload.cardId?
                                    {...card, checklists: [ ...card.checklists.map(checklist=>checklist._id===payload.checklistId? {...checklist, ...payload.checklist} : checklist)]} : card)
                            ]
                        } : list)],
                    allCards: [...state.thisBoard.allCards.map(card=>card._id===payload.cardId?
                        {...card, checklists: [ ...card.checklists.map(checklist=>checklist._id===payload.checklistId? {...checklist, ...payload.checklist} : checklist)]} : card)]
                }
            }
        case ADD_CHECKLIST_ITEM:
            return {
                ...state,
                thisBoard: {
                    ...state.thisBoard,
                    lists: [...state.thisBoard.lists.map(list=>list._id===payload.listId?
                        { ...list,
                            cards: [
                                ...list.cards.map(card=>card._id===payload.cardId?
                                    {...card, checklists: [ ...card.checklists.map(checklist=>checklist._id===payload.checklistId? {...checklist, items: [...checklist.items, {_id: payload._id||checklist.items.length, text: payload.text, completed:false}]} : checklist)]} : card)
                            ]
                        } : list)],
                    allCards: [...state.thisBoard.allCards.map(card=>card._id===payload.cardId?
                        {...card, checklists: [ ...card.checklists.map(checklist=>checklist._id===payload.checklistId? {...checklist, items: [...checklist.items, {_id: payload._id||checklist.items.length, text: payload.text, completed:false}]} : checklist)]} : card)]
                }
            }
        case DELETE_CHECKLIST_ITEM:
            return {
                ...state,
                thisBoard: {
                    ...state.thisBoard,
                    lists: [...state.thisBoard.lists.map(list=>list._id===payload.listId?
                        { ...list,
                            cards: [
                                ...list.cards.map(card=>card._id===payload.cardId?
                                    {...card, checklists: [ ...card.checklists.map(checklist=>checklist._id===payload.checklistId? {...checklist, items: [...checklist.items.filter(item=>item._id!==payload.itemId)]} : checklist)]} : card)
                            ]
                        } : list)],
                    allCards: [...state.thisBoard.allCards.map(card=>card._id===payload.cardId?
                        {...card, checklists: [ ...card.checklists.map(checklist=>checklist._id===payload.checklistId? {...checklist, items: [...checklist.items.filter(item=>item._id!==payload.itemId)]} : checklist)]} : card)]
                }
            }
        case EDIT_CHECKLIST_ITEM:
            return {
                ...state,
                thisBoard: {
                    ...state.thisBoard,
                    lists: [...state.thisBoard.lists.map(list=>list._id===payload.listId?
                        { ...list,
                            cards: [
                                ...list.cards.map(card=>card._id===payload.cardId?
                                    {...card, checklists: [ ...card.checklists.map(checklist=>checklist._id===payload.checklistId? {...checklist, items: [...checklist.items.map(item=>item._id===payload.itemId? {...item, ...payload.formData} : item)]} : checklist)]} : card)
                            ]
                        } : list)],
                    allCards: [...state.thisBoard.allCards.map(card=>card._id===payload.cardId?
                        {...card, checklists: [ ...card.checklists.map(checklist=>checklist._id===payload.checklistId? {...checklist, items: [...checklist.items.map(item=>item._id===payload.itemId? {...item, ...payload.formData} : item)]} : checklist)]} : card)]
                }
            }
            // ...state,
            //     thisBoard: {
            //         ...state.thisBoard,
            //         lists: [...state.thisBoard.lists.map(list=>list._id===payload.listId?
            //             { ...list, cards: [...list.cards.filter(card=>card._id!==list.cards.length-1), {...payload.card, archived:false, members:payload.card.members||[], checklists:[], _id:payload.card._id||list.cards.length }]} 
            //             : list
            //         )],
            //         allCards: [
            //             ...state.thisBoard.allCards.filter(card=>card._id!==state.thisBoard.allCards.length-1), 
            //             {...payload.card, archived:false, checklists:[], members:payload.card.members||[], _id:payload.card._id||state.thisBoard.allCards.length }
            //         ]
            //     }
        default:
            return state
    }
}
