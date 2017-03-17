import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import ControlPanel from '../components/ControlPanel'
import { allUsers, hello} from '../queries/index'

import * as drawerActions from '../actions/drawer'
import * as navigationActions  from '../actions/navigation'

const ControlPanelbWithQuery =  graphql(hello)(ControlPanel);


function stateToProps(state) {
    const { navigationState, drawer } = state;
    return { navigationState, drawer};
}

function dispatchToProps(dispatch) {

    const actions = Object.assign({}, { ...drawerActions, ...navigationActions });
    return bindActionCreators(actions, dispatch)
}

export default connect(stateToProps, dispatchToProps)(ControlPanel)
