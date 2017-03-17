import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import TestPage from '../components/TestPage'
import { allUsers, hello, getUserById} from '../queries/index'

import * as drawerActions from '../actions/drawer'
import * as navigationActions  from '../actions/navigation'

const TestPageWithQuery =  graphql(getUserById, {
    options: ({ uid }) => ({ variables: { uid: uid ? uid : '559645cd1a38532d14349242'} }),
})(TestPage);

function stateToProps(state) {
    const { navigationState, drawer } = state;
    return { navigationState, drawer};
}

function dispatchToProps(dispatch) {

    const actions = Object.assign({}, { ...drawerActions, ...navigationActions });
    return bindActionCreators(actions, dispatch)
}

export default connect(stateToProps, dispatchToProps)(TestPageWithQuery)
