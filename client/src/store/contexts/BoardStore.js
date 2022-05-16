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
        addList: (...e)=>actions.addList(...e)(boardDispatch),
        deleteList: (...e)=>actions.deleteList(...e)(boardDispatch),
        renameList: (...e)=>actions.renameList(...e)(boardDispatch),
        addCard: (...e)=>actions.addCard(...e)(boardDispatch),
        deleteCard: (...e)=>actions.deleteCard(...e)(boardDispatch),
        renameCard: (...e)=>actions.renameCard(...e)(boardDispatch),
    }
    
    const value = {board, dispatchedActions}

    return (
        <BoardContext.Provider value={value}>
            {props.children}
        </BoardContext.Provider>
    )
 }