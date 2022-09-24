import React, {createContext, useReducer} from 'react'
import {boardReducer, boardState} from '../reducers/board'
import * as actions from '../actions/board'

export const BoardContext = createContext()

export default function AuthStore(props) {
    const [board, boardDispatch] = useReducer(boardReducer, boardState)

    const dispatchedActions = Object.assign(...Object.keys(actions).map(func => ({[func]: (...args) => actions[func](...args)(boardDispatch)})))

    const findUsers = (...e) => actions.findUsers(...e)
    
    const value = {board, dispatchedActions: {...dispatchedActions, findUsers}}

    return (
        <BoardContext.Provider value={value}>
            {props.children}
        </BoardContext.Provider>
    )
 }