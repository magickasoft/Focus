import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'

import TestPage from '../components/TestPage'
import offlineHOC from '../offlineHOC'
import { getUserById} from '../queries/index'

import * as drawerActions from '../actions/drawer'
import * as navigationActions  from '../actions/navigation'

const TestPageWithQuery =  graphql(getUserById, {
    options: ({ uid }) => {
        // console.log('~~~ option',uid);
        return { variables: { uid: uid ? uid : ''} }
    },
})(TestPage);
// const  TestPageOfflineHOC = offlineHOC(getUserById, { uid: '58d0e6ead2be9d7a7a618d4f'})(TestPageWithQuery);
const  TestPageOfflineHOC = offlineHOC(getUserById, { uid: '58d0e6ead2be9d7a7a618d4f'})(TestPageWithQuery);

function stateToProps(state) {
    const { navigationState, drawer } = state;
    return { navigationState, drawer};
}

function dispatchToProps(dispatch) {

    const actions = Object.assign({}, { ...drawerActions, ...navigationActions });
    return bindActionCreators(actions, dispatch)
}

export default connect(stateToProps, dispatchToProps)(TestPageOfflineHOC)
