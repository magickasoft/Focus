'use strict';
import {
    View,
    Text,
} from 'react-native';
import React, { Component  } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo'
import get from 'lodash/get';

import * as netinfoActions  from './actions/netinfo'

import apolloClient from  './apolloConfig'
import store from  './storeConfig'

function offlineHOC(query, queryOptions ) {

    const options = get(queryOptions, 'options', null);
    //console.log('~~~ offlineHOC params', params[0]);
    let getVariablesFunction = () => {get(options, 'variables', {})};
    if (options !== null) {
        if (typeof options === 'function') {
            getVariablesFunction = (props) => get(options(props), 'variables', {});
        }
    }


    return function offlineFilterWrapper( WrappedComponentWithoutQuery ) {

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
                        return true;
                    case 'UNKNOWN':
                    case 'NONE':
                    case 'unknown':
                    case 'none':
                        return false;
                        break;
                    default:
                        return false;
                }
            };

            render() {
                const { netinfo } = this.props;
                console.log('~~~~~~ HOC props', this.props);
                let toRender;
                console.log('~~~ isOffline', netinfo);


                if (this.determineConnect(netinfo.type)) {
                    console.log('~~~~~~ online');
                    const WrappedComponentGraphQl = graphql(query, queryOptions)(WrappedComponentWithoutQuery);
                    toRender =  (
                        <WrappedComponentGraphQl {...this.props}/>
                    );

                }else {
                    console.log('~~~~~~ offline');

                    try {
                        const data = apolloClient.readQuery({
                            query: query,
                            variables: getVariablesFunction(this.props),
                        });
                        toRender = data ? (
                                // <WrappedComponent {...this.props}/>
                                <WrappedComponentWithoutQuery data={data} {...this.props} />
                            ) : (
                                <View><Text>нет данных</Text></View>
                            );

                    }catch (e) {
                        toRender = <View><Text>нет данных</Text></View>;
                    }

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

        return connect(mapStateToProps, mapDispatchToProps)(offlineFilter);


    }

}

export default offlineHOC;