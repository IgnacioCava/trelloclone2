import React from 'react';
import {AuthContext} from './AuthStore';

export const withAuth = Component => props => {

    return <AuthContext.Consumer>
        {context => <Component {...props} state={context.auth} actions={{...context.dispatchedActions}} />}
    </AuthContext.Consumer>
}