'use strict';
import {
    View,
    Text,
} from 'react-native';
import React, { Component  } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo'

import * as netinfoActions  from './actions/netinfo'

import apolloClient from  './apolloConfig'
import store from  './storeConfig'

function offlineHOC(...params) {
    //console.log('~~~ offlineHOC params', params[0]);
    return function offlineFilterWrapper( WrappedComponent ) {

        class offlineFilter extends Component {
            constructor(props) {
                super(props);
                this.state = {
                };
            }
            determineConnect = (type) => {
                switch (type) {
                    case 'wifi':
                    case 'cell':
                    case 'BLUETOOTH':
                    case 'DUMMY':
                    case 'ETHERNET':
                    case 'MOBILE':
                    case 'MOBILE_DUN':
                    case 'MOBILE_HIPRI':
                    case 'MOBILE_MMS':
                    case 'MOBILE_SUPL':
                    case 'VPN':
                    case 'WIFI':
                    case 'WIMAX':
                        return false;
                    case 'UNKNOWN':
                    case 'NONE':
                    case 'unknown':
                    case 'none':
                        return true;
                        break;
                    default:
                        return true;
                }
            }
            render() {
                const { netinfo } = this.props;
                let toRender;
                console.log('~~~ isOffline', netinfo);
                if (!this.determineConnect(netinfo.type)) {
                    console.log('~~~~~~ online');
                    toRender =  (
                        <WrappedComponent {...this.props}/>
                    );

                }else {
                    console.log('~~~~~~ offline');
                       // метод не гуд
                    const data = apolloClient.readQuery({
                        query: params[0],
                        variables: params[1],
                    });
                    console.log('~~~~~~????', data);
                    toRender = data ? (
                            <WrappedComponent {...this.props}/>
                        ) : (
                            <View><Text>нет данных</Text></View>
                        );

                }
                return (
                    <View style={{flex:1}}>
                        {toRender}
                    </View>

                );
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

        if (params.length > 0 && params.length <= 2) {
            return connect(mapStateToProps, mapDispatchToProps)(offlineFilter);
        }else {
            return (WrappedComponent);
        }


    }

}

export default offlineHOC;