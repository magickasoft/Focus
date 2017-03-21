'use strict';

import React, { Component  } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as netinfoActions  from './actions/netinfo'

import apolloClient from  './apolloConfig'
import store from  './storeConfig'

function offlineHOC(...params) {
    console.log('~~~ params', params);
    return function offlineFilterWrapper( WrappedComponent ) {
        class offlineFilter extends Component {
            constructor(props) {
                super(props);
                this.state = {
                };
            }

            render() {
                console.log('~~~ offlineFilter props',this.props);
                return (<WrappedComponent {...this.props}/>);
            }
        }

        function mapStateToProps(state) {
            const { navigationState, drawer, netinfo } = state;
            return { navigationState, drawer, netinfo };
        }
        function mapDispatchToProps(dispatch) {

            const actions = Object.assign({}, { ...netinfoActions });
            return bindActionCreators(actions, dispatch)
        }
        return connect(mapStateToProps, mapDispatchToProps)(offlineFilter);
    }
}

export default offlineHOC;