import React, {createContext, useReducer} from 'react'
import {authReducer, authState} from '../reducers/auth'
import * as actions from '../actions/auth'

export const AuthContext = createContext()

export default function AuthStore(props) {
    const [auth, authDispatch] = useReducer(authReducer, authState)

    const dispatchedActions = {
        register: (...e)=>actions.register(...e)(authDispatch),
        login: (...e)=>actions.login(...e)(authDispatch),
        loadUser: (...e)=>actions.loadUser()(authDispatch),
        logout: (...e)=>actions.logout(...e)(authDispatch)
    }
    
    const value = {auth, dispatchedActions}

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    )
 }