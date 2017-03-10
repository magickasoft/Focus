import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import MainTabBar from '../components/MainTabBar'
import * as drawerActions from '../actions/drawer'
import { clapitLogout, verifyDeviceToken } from '../actions/clapit'


function stateToProps(state) {
    //TODO
    return state
}

function dispatchToProps(dispatch) {
    let actions = _.extend({}, drawerActions,  { clapitLogout, verifyDeviceToken })

    return bindActionCreators(actions, dispatch)
}

export default connect(stateToProps, dispatchToProps)(MainTabBar)
