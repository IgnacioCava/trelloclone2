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
        clear: ()=>actions.clear()(boardDispatch)
    }
    
    const value = {board, dispatchedActions}

    return (
        <BoardContext.Provider value={value}>
            {props.children}
        </BoardContext.Provider>
    )
 }