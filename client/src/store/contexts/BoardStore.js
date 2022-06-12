import React, {createContext, useReducer} from 'react'
import {boardReducer, boardState} from '../reducers/board'
import * as actions from '../actions/board'

export const BoardContext = createContext()

export default function AuthStore(props) {
    const [board, boardDispatch] = useReducer(boardReducer, boardState)

    const dispatchedActions = {
        getBoards: ()=>actions.getBoards()(boardDispatch),
        getBoard: (...e)=>actions.getBoard(...e)(boardDispatch),
        createBoard: (...e)=>actions.createBoard(...e)(boardDispatch),
        clear: ()=>actions.clear()(boardDispatch),
        renameBoard: (...e)=>actions.renameBoard(...e)(boardDispatch),
        getActivity: (...e)=>actions.getActivity(...e)(boardDispatch),
        changeBoardBackground: (...e)=>actions.changeBoardBackground(...e)(boardDispatch),
        sortBoardLists: (...e)=>actions.sortBoardLists(...e)(boardDispatch),
        getUser: ()=>actions.getUser()(boardDispatch),

        addList: (...e)=>actions.addList(...e)(boardDispatch),
        deleteList: (...e)=>actions.deleteList(...e)(boardDispatch),
        renameList: (...e)=>actions.renameList(...e)(boardDispatch),
        toggleListStatus: (...e)=>actions.toggleListStatus(...e)(boardDispatch),
        sortListCards: (...e)=>actions.sortListCards(...e)(boardDispatch),

        addCard: (...e)=>actions.addCard(...e)(boardDispatch),
        deleteCard: (...e)=>actions.deleteCard(...e)(boardDispatch),
        editCard: (...e)=>actions.editCard(...e)(boardDispatch),
        toggleCardMember: (...e)=>actions.toggleCardMember(...e)(boardDispatch),
        toggleCardStatus: (...e)=>actions.toggleCardStatus(...e)(boardDispatch),

        addChecklist: (...e)=>actions.addChecklist(...e)(boardDispatch),
        deleteChecklist: (...e)=>actions.deleteChecklist(...e)(boardDispatch),
        renameChecklist: (...e)=>actions.renameChecklist(...e)(boardDispatch),
        addChecklistItem: (...e)=>actions.addChecklistItem(...e)(boardDispatch),
        deleteChecklistItem: (...e)=>actions.deleteChecklistItem(...e)(boardDispatch),
        editChecklistItem: (...e)=>actions.editChecklistItem(...e)(boardDispatch),
        
        findUsers: (...e)=>actions.findUsers(...e),
        addMember: (...e)=>actions.addMember(...e)(boardDispatch),
        deleteMember: (...e)=>actions.deleteMember(...e)(boardDispatch),
    }
    
    const value = {board, dispatchedActions}

    return (
        <BoardContext.Provider value={value}>
            {props.children}
        </BoardContext.Provider>
    )
 }