'use strict';
import React, { Component } from 'react';
import {
    AppRegistry,
    NetInfo,
} from 'react-native'

import { Provider } from 'react-redux'
import { ApolloProvider } from 'react-apollo';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import App from './js/app'

import apolloClient from  './js/apolloConfig'
import store from  './js/storeConfig'

import * as netinfoActions  from './js/actions/netinfo'


class wrapper extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
      };
    }
    _handleConnectionInfoChange = (connectionInfo) => {
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

      return (
        <ApolloProvider store={store} client={apolloClient}>
          <App />
        </ApolloProvider>
      )
    }
}

export default wrapper;
