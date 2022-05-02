import {BoardContext} from './BoardStore';

export const withBoard = Component => props => {

    return <BoardContext.Consumer>
        {context => <Component {...props} state={context.board} actions={{...context.dispatchedActions}} />}
    </BoardContext.Consumer>
}