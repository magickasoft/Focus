import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'

import First_tab from '../components/Feed/FeedItem'
import { offlineHOC } from '../offlineHOC'
import { allUsers } from '../queries/index'

import * as drawerActions from '../actions/drawer'
import * as navigationActions  from '../actions/navigation'

const First_tabWithQuery =  graphql(allUsers, {
    options: {
      //fetchPolicy: 'cache-and-network',
    }
})(First_tab);

const  hookWrap = offlineHOC(allUsers,'two')(First_tab);
// const  hookWrap = offlineHOC(First_tab);

function stateToProps(state) {

    const { clapitAccountData, navigationState, drawer } = state;
    return { clapitAccountData, navigationState, drawer };
    //let { feed, clapitAccountData, friends, navigationState, drawer } = state
    // let {items, itemsById, fetchingData, reloading, error, page} = feed
    // return { items, itemsById, fetchingData, reloading, error, clapitAccountData, page, friends, navigationState, drawer}
}

function dispatchToProps(dispatch) {

    const actions = Object.assign({}, { ...drawerActions, ...navigationActions });
    return bindActionCreators(actions, dispatch)
}

export default connect(stateToProps, dispatchToProps)(hookWrap)
