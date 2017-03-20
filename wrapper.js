'use strict'
import React, { Component } from 'react';
import {
    AppRegistry,
    NetInfo,
} from 'react-native'

import { Provider } from 'react-redux'
import { ApolloProvider } from 'react-apollo';

import App from './js/app'

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import apolloClient from  './js/apolloConfig'
import store from  './js/storeConfig'

import * as netinfoActions  from './js/actions/netinfo'

//     apolloClient.query({ query: gql`
//   query allUsers {
//     usersList {
//       id,
//       name,
//       friends {
//         id,
//         name
//       }
//     }
//   }
// ` });

class wrapper extends React.Component {
    constructor(props) {
      super(props);

      this.state = {online: false};
    }
    _handleConnectionInfoChange = (connectionInfo) => {
        this.setState({online: true});
        store.dispatch(netinfoActions.setNetInfoStatus(connectionInfo));
    };
    componentWillUnmount() {
        NetInfo.removeEventListener(
            'change',
            this._handleConnectionInfoChange
        );
    }
    componentDidMount() {
        NetInfo.addEventListener(
            'change',
            this._handleConnectionInfoChange
        );
    }
    render() {
        const {online} = this.state;
        if (!online) {
            return '...';
        }

      return (
        <ApolloProvider store={store} client={apolloClient}>
          <App />
        </ApolloProvider>
      )
    }
}

export default wrapper
