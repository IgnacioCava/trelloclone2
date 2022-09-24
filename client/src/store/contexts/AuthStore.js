import React, {createContext, useReducer} from 'react'
import {authReducer, authState} from '../reducers/auth'
import * as actions from '../actions/auth'

export const AuthContext = createContext()

export default function AuthStore(props) {
    const [auth, authDispatch] = useReducer(authReducer, authState)

    const dispatchedActions = Object.assign(...Object.keys(actions).map(func => ({[func]: (...args) => actions[func](...args)(authDispatch)})))
    
    const value = {auth, dispatchedActions}

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    )
 }