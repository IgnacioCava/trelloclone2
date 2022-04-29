import React, {createContext, useReducer} from 'react'
import {authReducer, authState} from '../reducers/auth'
import * as authActions from '../actions/auth'

export const AuthContext = createContext()

export default function AuthStore(props) {
    const [auth, authDispatch] = useReducer(authReducer, authState)

    const dispatchedActions = {
        register: (...e)=>authActions.register(...e)(authDispatch),
        login: (...e)=>authActions.login(...e)(authDispatch),
        loadUser: (...e)=>authActions.loadUser()(authDispatch),
        logout: (...e)=>authActions.logout(...e)(authDispatch)
    }
    
    const value = {auth, dispatchedActions}

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    )
 }