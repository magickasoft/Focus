'use strict'
import React, { Component } from 'react';
import {
    AppRegistry,
    AsyncStorage,
    Platform,
    NetInfo,
} from 'react-native'
import { applyMiddleware, createStore, combineReducers,  compose } from 'redux'
import { composeWithDevTools } from 'remote-redux-devtools'
import { persistStore, autoRehydrate } from 'redux-persist'
import { Provider } from 'react-redux'

import { ApolloProvider } from 'react-apollo';
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import rootReducer from './js/reducers'
import App from './js/app'

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import apolloClient from  './js/apolloConfig'

//     client.query({ query: gql`
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

    let middlewareApplied;
    const logger = createLogger();

    middlewareApplied = applyMiddleware(apolloClient.middleware(), thunk, logger);

    const composeEnhancers = composeWithDevTools({
        name: Platform.OS, realtime: true,
        hostname: 'localhost', port: 8000,
        autoReconnect: true,
    });

    const store = createStore(rootReducer, // {},
        compose(
            // composeEnhancers(
            autoRehydrate(),
            middlewareApplied,
            (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
        ));
    persistStore(store, {
        storage: AsyncStorage,
        whitelist: ['apollo','autoRehydrated','clapitAccountData','drawer', /*'navigationState',*/ 'newNotifications', 'preferences',]
    }).purge([]);

class wrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          connectionInfo: '',
        };
    }
    _handleConnectionInfoChange = (connectionInfo) => {

        this.setState({
          connectionInfo,
        });
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
        console.log('~~~~ app inetconnect', this.state.connectionInfo);


        return (

            <ApolloProvider store={store} client={apolloClient}>
                <App />
            </ApolloProvider>
        )
    }
}

export default wrapper
