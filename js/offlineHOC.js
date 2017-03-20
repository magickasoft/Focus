'use strict';
import React, { Component } from 'react';
import {
    AppRegistry,
    View,
    Text,
} from 'react-native'

// import { bindActionCreators } from 'redux'
// import { connect } from 'react-redux'

import apolloClient from  './apolloConfig'
import store from  './storeConfig'

import * as netinfoActions  from './actions/netinfo'

export function offlineHOC(...params) {
    console.log('~~~~ params', params);
    return function offlineHOC(WrappedComponent) {
     // console.log('~~~~ WrappedComponent', WrappedComponent);
        return class HOC extends React.Component {
            constructor(props) {
                super(props);
                this.state = {
                };
            }
            render() {
                return (<WrappedComponent {...this.props}/>);
            }
        }
    }
}

// function dispatchToProps(dispatch) {
//
//     const actions = Object.assign({}, { ...netinfoActions });
//     return bindActionCreators(actions, dispatch)
// }
// export default connect(stateToProps, dispatchToProps)(hook)
