import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import First_tab from '../components/Feed/FeedItem'
import * as drawerActions from '../actions/drawer'

function stateToProps(state) {
    let { feed, clapitAccountData, friends, navigationState, drawer } = state
    // let {items, itemsById, fetchingData, reloading, error, page} = feed
    // return { items, itemsById, fetchingData, reloading, error, clapitAccountData, page, friends, navigationState, drawer}
    return { clapitAccountData, friends, navigationState, drawer}
}

function dispatchToProps(dispatch) {

    let actions = Object.assign({}, drawerActions)

    return bindActionCreators(actions, dispatch)
}

export default connect(stateToProps, dispatchToProps)(First_tab)
