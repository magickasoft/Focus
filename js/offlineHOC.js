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
    console.log('~~~ offlineHOC params', params[0]);
    return function offlineFilterWrapper( WrappedComponent ) {

        class offlineFilter extends Component {
            constructor(props) {
                super(props);
                this.state = {
                    online: false,
                };
            }
            determineConnect(type) {
                let isOffline;
                switch (types) {
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
                        isOffline = false;
                        break;
                    case 'UNKNOWN':
                    case 'NONE':
                    case 'unknown':
                    case 'none':
                    default:
                        isOffline = true;
                }
                this.setState({ online: !isOffline });
                Status = !isOffline;
            }
            componentDidMount() {
                const { netinfo } = this.props;
                this.determineConnect.bind(this,netinfo.type);
            }
            render() {
                const { online } = this.state;
                let toRender;
                console.log('~~~ online',online);
                if (online) {
                    toRender =  (
                        <WrappedComponent {...this.props}/>
                    );

                }else {
                    const data = apolloClient.readQuery({
                        query: params[0],
                    });
                    toRender = data ? (
                            <WrappedComponent {...this.props}/>
                        ) : (
                            <View><Text>нет данных</Text></View>
                        );
                    console.log('~~~ data apolloClient.readQuery',data);
                }

                console.log('~~~ toRender',toRender);
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

        if (params.length === 1) {
            return connect(mapStateToProps, mapDispatchToProps)(offlineFilter);
        }else {
            return (WrappedComponent);
        }


    }

}

export default offlineHOC;