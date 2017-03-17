import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import First_tab from '../components/Feed/FeedItem'
import { allUsers } from '../queries/index'

import * as drawerActions from '../actions/drawer'

const First_tabWithQuery =  graphql(allUsers)(First_tab);

function stateToProps(state) {
    const { clapitAccountData, navigationState, drawer } = state;
    return { clapitAccountData, navigationState, drawer};
    //let { feed, clapitAccountData, friends, navigationState, drawer } = state
    // let {items, itemsById, fetchingData, reloading, error, page} = feed
    // return { items, itemsById, fetchingData, reloading, error, clapitAccountData, page, friends, navigationState, drawer}
}

function dispatchToProps(dispatch) {

    const actions = Object.assign({}, { ...drawerActions })

    return bindActionCreators(actions, dispatch)
}

export default connect(stateToProps, dispatchToProps)(First_tab)
