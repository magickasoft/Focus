'use strict'
import React, { Component } from 'react';
import {
    AppRegistry,
} from 'react-native'

import { Provider } from 'react-redux'
import { ApolloProvider } from 'react-apollo';

import App from './js/app'

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import apolloClient from  './js/apolloConfig'
import store from  './js/storeConfig'

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
    }
    render() {
      return (
        <ApolloProvider store={store} client={apolloClient}>
          <App />
        </ApolloProvider>
      )
    }
}

export default wrapper
