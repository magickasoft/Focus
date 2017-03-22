import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'

import TestPage from '../components/TestPage'
import offlineHOC from '../offlineHOC'
import { getUserById} from '../queries/index'

import * as drawerActions from '../actions/drawer'
import * as navigationActions  from '../actions/navigation'

const  TestPageOfflineHOC = offlineHOC( getUserById, {
    options: ({ uid }) => {
        return { variables: { uid: uid } }
    }
})(TestPage);

function stateToProps(state) {
    const { navigationState, drawer } = state;
    return { navigationState, drawer};
}

function dispatchToProps(dispatch) {

    const actions = Object.assign({}, { ...drawerActions, ...navigationActions });
    return bindActionCreators(actions, dispatch)
}

export default connect(stateToProps, dispatchToProps)(TestPageOfflineHOC)
